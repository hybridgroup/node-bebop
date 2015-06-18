"use strict";

var EventEmitter = require("events").EventEmitter,
    dgram = require("dgram"),
    util = require("util"),
    net = require("net"),
    through = require("through"),
    ffmpeg = require("./ffmpeg-shim"),
    constants = require("./constants");

function networkFrameGenerator() {
  //
  // ARNETWORKAL_Frame_t
  //
  // uint8  type  - frame type ARNETWORK_FRAME_TYPE
  // uint8  id    - identifier of the buffer sending the frame
  // uint8  seq   - sequence number of the frame
  // uint32 size  - size of the frame
  //

  // each frame id has it"s own sequence number
  var seq = [];

  return function(cmd, type, id) {
    var hlen = 7, // size of ARNETWORKAL_Frame_t header
        buf = new Buffer(hlen);

    type = type || constants.ARNETWORKAL_FRAME_TYPE_DATA;
    id = id || constants.BD_NET_CD_NONACK_ID;

    if (!seq[id]) {
      seq[id] = 0;
    }

    seq[id]++;

    if (seq[id] > 255) {
      seq[id] = 0;
    }

    buf.writeUInt8(type, 0);
    buf.writeUInt8(id, 1);
    buf.writeUInt8(seq[id], 2);
    buf.writeUInt32LE(cmd.length + hlen, 3);

    return Buffer.concat([buf, cmd]);
  };
}

function networkFrameParser(buf) {
  var frame = {
    type: buf.readUInt8(0),
    id: buf.readUInt8(1),
    seq: buf.readUInt8(2),
    size: buf.readUInt32LE(3)
  };

  if (frame.size > 7) {
    frame.data = Buffer.concat([buf.slice(7, frame.size)]);
  }

  return frame;
}

function arstreamFrameParser(buf) {
  //
  // ARSTREAM_NetworkHeaders_DataHeader_t;
  //
  // uint16_t frameNumber;
  // uint8_t  frameFlags; // Infos on the current frame
  // uint8_t  fragmentNumber; // Index of the current fragment in current frame
  // uint8_t  fragmentsPerFrame; // Number of fragments in current frame
  //
  // * frameFlags structure :
  // *  x x x x x x x x
  // *  | | | | | | | \-> FLUSH FRAME
  // *  | | | | | | \-> UNUSED
  // *  | | | | | \-> UNUSED
  // *  | | | | \-> UNUSED
  // *  | | | \-> UNUSED
  // *  | | \-> UNUSED
  // *  | \-> UNUSED
  // *  \-> UNUSED
  // *
  //

  var frame = {
    frameNumber: buf.readUInt16LE(0),
    frameFlags: buf.readUInt8(2),
    fragmentNumber: buf.readUInt8(3),
    fragmentsPerFrame: buf.readUInt8(4),
  };

  frame.frame = Buffer.concat([buf.slice(5)]);

  return frame;
}

function validatePitch(val) {
  if (val > 100) {
    return 100;
  } else if (val < 0) {
    return 0;
  }

  return val | 0;
}

var Bebop = module.exports = function(opts) {
  opts = opts || {};
  this.navData = {};
  this.ip = opts.ip || "192.168.42.1";
  this.c2dPort = opts.c2dPort || 54321;
  this.d2cPort = opts.d2cPort || 43210;
  this.discoveryPort = opts.discoveryPort || 44444;
  this._c2dClient = dgram.createSocket("udp4");
  this._d2cServer = dgram.createSocket("udp4");
  this._discoveryClient = new net.Socket();
  this._networkFrameGenerator = networkFrameGenerator();
  this._arstreamFrame = {
    frameNumber: 0,
    frame: new Buffer([]),
    fragments: [],
  };
  this._pcmd = {};
};

util.inherits(Bebop, EventEmitter);

Bebop.prototype.getVideoStream = function() {
  var stream = through(function write(data) {
    this.emit("data", data);
  });

  this.on("video", function(data) {
    stream.write(data);
  });

  return stream;
};

Bebop.prototype.getMjpegStream = function(opts) {
  opts = opts || {};
  opts.quality = opts.quality || "1";

  var stream = through(function write(data) {
    this.emit("data", data);
  });

  ffmpeg(this.getVideoStream())
    .toFormat("mjpeg")
    .size("640x368")
    .inputFPS(30)
    .outputOptions(["-qscale:v " + opts.quality])
    .writeToStream(stream);

  return stream;
};

Bebop.prototype.connect = function(callback) {
  this.discover(function() {

    // nav and video
    this._d2cServer.bind(this.d2cPort);
    this._d2cServer.on("message", this._packetReceiver.bind(this));

    // send pcmd values at 40hz
    setInterval(function() {
      this._writePacket(this._generatePCMD(this._pcmd));
    }.bind(this), 25);

    this.generateAllStates();
    this.flatTrim();

    if (typeof callback === "function") {
      callback();
    }

    this.emit("ready");
  }.bind(this));
};

Bebop.prototype.discover = function(callback) {
  this._discoveryClient.connect(this.discoveryPort, this.ip, function() {
    this._discoveryClient.write(JSON.stringify({
      "controller_type": "computer",
      "controller_name": "node-bebop",
      "d2c_port": this.d2cPort.toString()
    }));
  }.bind(this));

  this._discoveryClient.on("data", function(data) {
    this._discoveryClient.destroy();
    callback(data);
  }.bind(this));
};

Bebop.prototype._packetReceiver = function(message) {
  var networkFrame = networkFrameParser(message);

  //
  // libARNetwork/Sources/ARNETWORK_Receiver.c#ARNETWORK_Receiver_ThreadRun
  //
  if (networkFrame.type === constants.ARNETWORKAL_FRAME_TYPE_DATA_WITH_ACK) {
    this._writePacket(this._createAck(networkFrame));
  }

  if (networkFrame.type === constants.ARNETWORKAL_FRAME_TYPE_DATA_LOW_LATENCY &&
      networkFrame.id === constants.BD_NET_DC_VIDEO_DATA_ID)
  {
    var arstreamFrame = arstreamFrameParser(networkFrame.data);
    this._writePacket(this._createARStreamACK(arstreamFrame));
  }

  //
  // libARCommands/Sources/ARCOMMANDS_Decoder.c#ARCOMMANDS_Decoder_DecodeBuffer
  //
  if (networkFrame.id === constants.BD_NET_DC_EVENT_ID) {
    var commandProject = networkFrame.data.readUInt8(0),
        commandClass = networkFrame.data.readUInt8(1),
        commandId = networkFrame.data.readUInt16LE(2);
    switch (commandProject) {
      case constants.ARCOMMANDS_ID_PROJECT_COMMON:
        switch (commandClass) {
          case constants.ARCOMMANDS_ID_COMMON_CLASS_COMMONSTATE:
            switch (commandId) {
              case constants.ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_BATTERYSTATECHANGED:
                this.navData.battery = networkFrame.data.readUInt8(4);
                this.emit("battery", this.navData.battery);
                break;
            }
            break;
        }
        break;
      case constants.ARCOMMANDS_ID_PROJECT_ARDRONE3:
        switch (commandClass) {
          case constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTINGSTATE:
            switch (commandId) {
              case constants.ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLATTRIMCHANGED:
                break;
              case constants.ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLYINGSTATECHANGED:
                switch (networkFrame.data.readInt32LE(4)) {
                  case constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDED:
                    this.navData.flyingState = { landed: true };
                    this.emit("landed");
                    break;
                  case constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_TAKINGOFF:
                    this.navData.flyingState = { takingOff: true };
                    this.emit("takingOff");
                    break;
                  case constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_HOVERING:
                    this.navData.flyingState = { hovering: true };
                    this.emit("hovering");
                    break;
                  case constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_FLYING:
                    this.navData.flyingState = { flying: true };
                    this.emit("flying");
                    break;
                  case constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDING:
                    this.navData.flyingState = { landing: true };
                    this.emit("landing");
                    break;
                  case constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_EMERGENCY:
                    this.navData.flyingState = { emergency: true };
                    this.emit("emergency");
                    break;
                }
                break;
            }
            break;
        }
        break;
    }
  }

  //
  // libARNetwork/Sources/ARNETWORK_Receiver.c#ARNETWORK_Receiver_ThreadRun
  //
  if (networkFrame.id === constants.ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PING) {
    this.navData.flyingTime = networkFrame.data.readUInt32LE(0) + (networkFrame.data.readUInt32LE(4) / 1000000000.0);
    this._writePacket(this._createPong(networkFrame));
  }
};

Bebop.prototype.up = function(val) {
  this._pcmd.gaz = validatePitch(val);
  return this;
};

Bebop.prototype.down = function(val) {
  this._pcmd.gaz = validatePitch(val) * -1;
  return this;
};

Bebop.prototype.front = function(val) {
  return this.forward(val);
};

Bebop.prototype.forward = function(val) {
  this._pcmd.pitch = validatePitch(val);
  return this;
};

Bebop.prototype.back = function(val) {
  return this.backward(val);
};

Bebop.prototype.backward = function(val) {
  this._pcmd.pitch = validatePitch(val) * -1;
  return this;
};

Bebop.prototype.right = function(val) {
  this._pcmd.roll = validatePitch(val);
  return this;
};

Bebop.prototype.left = function(val) {
  this._pcmd.roll = validatePitch(val) * -1;
  return this;
};

Bebop.prototype.clockwise = function(val) {
  this._pcmd.yaw = validatePitch(val);
  return this;
};

Bebop.prototype.counterClockwise = function(val) {
  this._pcmd.yaw = validatePitch(val) * -1;
  return this;
};

Bebop.prototype.stop = function() {
  this._pcmd = {
    flag: 1,
    roll: 0,
    pitch: 0,
    yaw: 0,
    gaz: 0,
  };

  return this;
};

Bebop.prototype.frontFlip = function() {
  return this._animationsFlip(constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_FRONT);
};

Bebop.prototype.backFlip = function() {
  return this._animationsFlip(constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_BACK);
};

Bebop.prototype.rightFlip = function() {
  return this._animationsFlip(constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_RIGHT);
};

Bebop.prototype.leftFlip = function() {
  return this._animationsFlip(constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_LEFT);
};

Bebop.prototype._animationsFlip = function(direction) {
  //
  //  ARCOMMANDS_Generator_GenerateARDrone3AnimationsFlip
  //

  var buf = new Buffer(8);

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_ANIMATIONS, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_ANIMATIONS_CMD_FLIP, 2);
  buf.writeUInt32LE(direction, 4);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype.takeoff = function(callback) {
  return this.takeOff(callback);
};

Bebop.prototype.takeOff = function(callback) {
  //
  //  ARCOMMANDS_Generator_GenerateARDrone3PilotingTakeOff
  //

  var buf = new Buffer(4);

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_TAKEOFF, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  this.once("flying", callback || function() {});
  return this;
};

Bebop.prototype.land = function(callback) {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingLanding
  //

  var buf = new Buffer(4);

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_LANDING, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  this.once("landed", callback || function() {});
  return this;
};

Bebop.prototype.emergency = function() {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingEmergency
  //

  var buf = new Buffer(4);

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_EMERGENCY, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype.generateAllStates = function() {
  //
  // ARCOMMANDS_Generator_GenerateCommonCommonAllStates
  //

  var buf = new Buffer(4);

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_COMMON, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_COMMON_CLASS_COMMON, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_COMMON_COMMON_CMD_ALLSTATES, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype.calibrate = function() {
  return this.flatTrim();
};

Bebop.prototype.flatTrim = function() {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingFlatTrim
  //

  var buf = new Buffer(4);

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_FLATTRIM, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype.takePicture = function(opts) {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3MediaRecordPicture
  //

  var buf = new Buffer(5);

  opts = opts || {};
  opts.storageId = opts.storageId || 0;

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIARECORD, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_MEDIARECORD_CMD_PICTURE, 2);
  buf.writeUInt8(opts.storageId, 4);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype.startRecording = function(opts) {
  opts = opts || {};
  opts.recordState = constants.ARCOMMANDS_ARDRONE3_MEDIARECORD_VIDEO_RECORD_START;

  var buf = this._videoRecord(opts);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype.stopRecording = function(opts) {
  opts = opts || {};
  opts.recordState = constants.ARCOMMANDS_ARDRONE3_MEDIARECORD_VIDEO_RECORD_STOP;

  var buf = this._videoRecord(opts);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
};

Bebop.prototype._videoRecord = function(opts) {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3MediaRecordVideo
  //

  var buf = new Buffer(9);

  opts = opts || {};
  opts.storageId = opts.storageId || 0;
  opts.recordState = opts.recordState || 0;

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIARECORD, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_MEDIARECORD_CMD_VIDEO, 2);
  buf.writeUInt32LE(opts.recordState, 4);
  buf.writeUInt8(opts.storageId, 8);

  return buf;
};

Bebop.prototype._createAck = function(networkFrame) {
  var buf = new Buffer(1);

  //
  // ARNETWORK_Receiver_ThreadRun
  //
  buf.writeUInt8(networkFrame.seq, 0);

  //
  //
  // libARNetwork/Sources/ARNETWORK_Manager.h#ARNETWORK_Manager_IDOutputToIDAck
  //
  var id = networkFrame.id + (constants.ARNETWORKAL_MANAGER_DEFAULT_ID_MAX / 2);

  return this._networkFrameGenerator(buf, constants.ARNETWORKAL_FRAME_TYPE_ACK, id);
};

Bebop.prototype._createPong = function(networkFrame) {
  return this._networkFrameGenerator(networkFrame.data, constants.ARNETWORKAL_FRAME_TYPE_DATA, constants.ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PONG);
};

Bebop.prototype._createARStreamACK = function(arstreamFrame) {
  //
  // ARSTREAM_NetworkHeaders_AckPacket_t;
  //
  // uint16_t frameNumber;    // id of the current frame
  // uint64_t highPacketsAck; // Upper 64 packets bitfield
  // uint64_t lowPacketsAck;  // Lower 64 packets bitfield
  //
  // libARStream/Sources/ARSTREAM_NetworkHeaders.c#ARSTREAM_NetworkHeaders_AckPacketSetFlag
  //

  if (arstreamFrame.frameNumber !== this._arstreamFrame.frameNumber) {
    if (this._arstreamFrame.fragments.length > 0) {
      var emit = false;

      // if we missed some frames, wait for the next iframe
      if (arstreamFrame.frameNumber !== this._arstreamFrame.frameNumber + 1) {
        this._arstreamFrame.waitForIframe = true;
      }

      // if it's an iframe
      if (this._arstreamFrame.frameFlags === 1) {
        this._arstreamFrame.waitForIframe = false;
        emit = true;
      } else if (!this._arstreamFrame.waitForIframe) {
        emit = true;
      }

      if (emit) {
        var skip = false;
        for (var i = 0; i < this._arstreamFrame.fragments.length; i++) {
          // check if any fragments are missing
          if (!Buffer.isBuffer(this._arstreamFrame.fragments[i])) {
            skip = true;
            break;
          }
          this._arstreamFrame.frame = Buffer.concat([this._arstreamFrame.frame, this._arstreamFrame.fragments[i]]);
        }

        if (!skip) {
          this.emit("video", this._arstreamFrame.frame);
        }
      }
    }

    this._arstreamFrame.fragments = [];
    this._arstreamFrame.frame = new Buffer(0);
    this._arstreamFrame.frameACK = new Buffer(16);
    this._arstreamFrame.frameACK.fill(0);
    this._arstreamFrame.frameNumber = arstreamFrame.frameNumber;
    this._arstreamFrame.frameFlags = arstreamFrame.frameFlags;
  }

  this._arstreamFrame.fragments[arstreamFrame.fragmentNumber] = Buffer.concat([arstreamFrame.frame]);

  //
  // each bit in the highPacketsAck and lowPacketsAck correspond to the
  // fragmentsPerFrame which have been received per frameNumber, so time to
  // flip some bits!
  //

  var bufferPosition = arstreamFrame.fragmentNumber / 8 | 0;
  var tmp = this._arstreamFrame.frameACK.readUInt8(bufferPosition);

  tmp |= 1 << (arstreamFrame.fragmentNumber % 8);

  this._arstreamFrame.frameACK.writeUInt8(tmp, bufferPosition);

  // lowPacketsAck and highPacketsAck are stored contiguously
  // in a 16 byte buffer and then reordered accordingly for transport
  var ackPacket = {
    frameNumber: this._arstreamFrame.frameNumber,
    packetsACK: Buffer.concat([this._arstreamFrame.frameACK.slice(8), this._arstreamFrame.frameACK.slice(0, 8)]),
  };

  var ret = new Buffer(18);
  ret.fill(0);
  ret.writeUInt16LE(ackPacket.frameNumber, 0);
  ackPacket.packetsACK.copy(ret, 2);

  return this._networkFrameGenerator(ret, constants.ARNETWORKAL_FRAME_TYPE_DATA, constants.BD_NET_CD_VIDEO_ACK_ID);
};

Bebop.prototype._generatePCMD = function(opts) {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingPCMD
  //
  // uint8 - flag Boolean flag to activate roll/pitch movement
  // int8  - roll Roll consign for the drone [-100;100]
  // int8  - pitch Pitch consign for the drone [-100;100]
  // int8  - yaw Yaw consign for the drone [-100;100]
  // int8  - gaz Gaz consign for the drone [-100;100]
  // float - psi [NOT USED] - Magnetic north heading of the
  //         controlling device (deg) [-180;180]
  //

  var buf = new Buffer(13);

  this._pcmd = opts || {};

  buf.writeUInt8(constants.ARCOMMANDS_ID_PROJECT_ARDRONE3, 0);
  buf.writeUInt8(constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_PCMD, 2);
  buf.writeUInt8(this._pcmd.flag || 1, 4);
  buf.writeInt8(this._pcmd.roll || 0, 5);
  buf.writeInt8(this._pcmd.pitch || 0, 6);
  buf.writeInt8(this._pcmd.yaw || 0, 7);
  buf.writeInt8(this._pcmd.gaz || 0, 8);
  buf.writeFloatLE(this._pcmd.psi || 0, 9);

  return this._networkFrameGenerator(buf);
};

Bebop.prototype._writePacket = function(packet) {
  this._c2dClient.send(packet, 0, packet.length, this.c2dPort, this.ip,
    function(err) {
      if (err) {
        throw err;
      }
    }
  );
};
