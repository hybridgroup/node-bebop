'use strict';

var net = require("net"),
    dgram = require("dgram"),
    util = require("util"),
    EventEmitter = require("events").EventEmitter,

    // eARCOMMANDS_ID_PROJECT
    ARCOMMANDS_ID_PROJECT_COMMON = 0,
    ARCOMMANDS_ID_PROJECT_ARDRONE3 = 1,

    // eARCOMMANDS_ID_ARDRONE3_CLASS
    ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING = 0,
    ARCOMMANDS_ID_ARDRONE3_CLASS_ANIMATIONS = 5,
    ARCOMMANDS_ID_ARDRONE3_CLASS_CAMERA = 1,
    ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIARECORD = 7,
    ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIARECORDSTATE = 8,
    ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIARECORDEVENT = 3,
    ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTINGSTATE = 4,
    ARCOMMANDS_ID_ARDRONE3_CLASS_NETWORK = 13,
    ARCOMMANDS_ID_ARDRONE3_CLASS_NETWORKSTATE = 14,
    ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTINGSETTINGS = 2,
    ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTINGSETTINGSSTATE = 6,
    ARCOMMANDS_ID_ARDRONE3_CLASS_SPEEDSETTINGS = 11,
    ARCOMMANDS_ID_ARDRONE3_CLASS_SPEEDSETTINGSSTATE = 12,
    ARCOMMANDS_ID_ARDRONE3_CLASS_NETWORKSETTINGS = 9,
    ARCOMMANDS_ID_ARDRONE3_CLASS_NETWORKSETTINGSSTATE = 10,
    ARCOMMANDS_ID_ARDRONE3_CLASS_SETTINGS = 15,
    ARCOMMANDS_ID_ARDRONE3_CLASS_SETTINGSSTATE = 16,
    ARCOMMANDS_ID_ARDRONE3_CLASS_DIRECTORMODE = 17,
    ARCOMMANDS_ID_ARDRONE3_CLASS_DIRECTORMODESTATE = 18,
    ARCOMMANDS_ID_ARDRONE3_CLASS_PICTURESETTINGS = 19,
    ARCOMMANDS_ID_ARDRONE3_CLASS_PICTURESETTINGSSTATE = 20,
    ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIASTREAMING = 21,
    ARCOMMANDS_ID_ARDRONE3_CLASS_MEDIASTREAMINGSTATE = 22,
    ARCOMMANDS_ID_ARDRONE3_CLASS_GPSSETTINGS = 23,
    ARCOMMANDS_ID_ARDRONE3_CLASS_GPSSETTINGSSTATE = 24,
    ARCOMMANDS_ID_ARDRONE3_CLASS_CAMERASTATE = 25,
    ARCOMMANDS_ID_ARDRONE3_CLASS_ANTIFLICKERING = 29,
    ARCOMMANDS_ID_ARDRONE3_CLASS_ANTIFLICKERINGSTATE = 30,

    // eARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLATTRIMCHANGED = 0,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLYINGSTATECHANGED = 1,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_ALERTSTATECHANGED = 2,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_NAVIGATEHOMESTATECHANGED = 3,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_POSITIONCHANGED = 4,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_SPEEDCHANGED = 5,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_ATTITUDECHANGED = 6,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_AUTOTAKEOFFMODECHANGED = 7,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_ALTITUDECHANGED = 8,
    ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_MAX = 9,

    // eARCOMMANDS_ID_ARDRONE3_ANIMATIONS_CMD;
    ARCOMMANDS_ID_ARDRONE3_ANIMATIONS_CMD_FLIP = 0,
    ARCOMMANDS_ID_ARDRONE3_ANIMATIONS_CMD_MAX = 1,

    // eARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE;
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDED = 0,
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_TAKINGOFF = 1,
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_HOVERING = 2,
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_FLYING = 3,
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDING = 4,
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_EMERGENCY = 5,
    ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_MAX = 6,

    // eARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION;
    ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_FRONT = 0,
    ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_BACK = 1,
    ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_RIGHT = 2,
    ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_LEFT = 3,
    ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_MAX = 4,

    // eARCOMMANDS_ID_COMMON_CLASS
    ARCOMMANDS_ID_COMMON_CLASS_NETWORK = 0,
    ARCOMMANDS_ID_COMMON_CLASS_NETWORKEVENT = 1,
    ARCOMMANDS_ID_COMMON_CLASS_SETTINGS = 2,
    ARCOMMANDS_ID_COMMON_CLASS_SETTINGSSTATE = 3,
    ARCOMMANDS_ID_COMMON_CLASS_COMMON = 4,
    ARCOMMANDS_ID_COMMON_CLASS_COMMONSTATE = 5,
    ARCOMMANDS_ID_COMMON_CLASS_OVERHEAT = 6,
    ARCOMMANDS_ID_COMMON_CLASS_OVERHEATSTATE = 7,
    ARCOMMANDS_ID_COMMON_CLASS_CONTROLLERSTATE = 8,
    ARCOMMANDS_ID_COMMON_CLASS_WIFISETTINGS = 9,
    ARCOMMANDS_ID_COMMON_CLASS_WIFISETTINGSSTATE = 10,
    ARCOMMANDS_ID_COMMON_CLASS_MAVLINK = 11,
    ARCOMMANDS_ID_COMMON_CLASS_MAVLINKSTATE = 12,
    ARCOMMANDS_ID_COMMON_CLASS_CALIBRATION = 13,
    ARCOMMANDS_ID_COMMON_CLASS_CALIBRATIONSTATE = 14,
    ARCOMMANDS_ID_COMMON_CLASS_CAMERASETTINGSSTATE = 15,
    ARCOMMANDS_ID_COMMON_CLASS_GPS = 16,
    ARCOMMANDS_ID_COMMON_CLASS_FLIGHTPLANSTATE = 17,
    ARCOMMANDS_ID_COMMON_CLASS_FLIGHTPLANEVENT = 19,
    ARCOMMANDS_ID_COMMON_CLASS_ARLIBSVERSIONSSTATE = 18,

    // eARCOMMANDS_ID_ARDRONE3_PILOTING_CMD
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_FLATTRIM = 0,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_TAKEOFF = 1,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_PCMD = 2,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_LANDING = 3,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_EMERGENCY = 4,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_NAVIGATEHOME = 5,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_AUTOTAKEOFFMODE = 6,
    ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_MAX = 7,

    // eARCOMMANDS_ID_COMMON_COMMON_CMD
    ARCOMMANDS_ID_COMMON_COMMON_CMD_ALLSTATES = 0,
    ARCOMMANDS_ID_COMMON_COMMON_CMD_CURRENTDATE = 1,
    ARCOMMANDS_ID_COMMON_COMMON_CMD_CURRENTTIME = 2,
    ARCOMMANDS_ID_COMMON_COMMON_CMD_REBOOT = 3,
    ARCOMMANDS_ID_COMMON_COMMON_CMD_MAX = 4,

    // eARCOMMANDS_ID_COMMON_COMMONSTATE_CMD;
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_ALLSTATESCHANGED = 0,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_BATTERYSTATECHANGED = 1,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_MASSSTORAGESTATELISTCHANGED = 2,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_MASSSTORAGEINFOSTATELISTCHANGED = 3,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_CURRENTDATECHANGED = 4,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_CURRENTTIMECHANGED = 5,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_MASSSTORAGEINFOREMAININGLISTCHANGED = 6,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_WIFISIGNALCHANGED = 6,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_SENSORSSTATESLISTCHANGED = 7,
    ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_MAX = 8,

    // eARMEDIA_ENCAPSULER_CODEC
    CODEC_UNKNNOWN = 0,
    CODEC_VLIB = 1,
    CODEC_P264 = 2,
    CODEC_MPEG4_VISUAL = 3,
    CODEC_MPEG4_AVC = 4,
    CODEC_MOTION_JPEG = 5,

    // eARMEDIA_ENCAPSULER_FRAME_TYPE;
    ARMEDIA_ENCAPSULER_FRAME_TYPE_UNKNNOWN = 0,
    ARMEDIA_ENCAPSULER_FRAME_TYPE_I_FRAME = 1,
    ARMEDIA_ENCAPSULER_FRAME_TYPE_P_FRAME = 2,
    ARMEDIA_ENCAPSULER_FRAME_TYPE_JPEG = 3,
    ARMEDIA_ENCAPSULER_FRAME_TYPE_MAX = 4,

    // libARNetworkAL/Includes/libARNetworkAL/ARNETWORKAL_Manager.h
    ARNETWORKAL_MANAGER_DEFAULT_ID_MAX = 256,

    // eARNETWORK_MANAGER_INTERNAL_BUFFER_ID
    ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PING = 0,
    ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PONG = 1,
    ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_MAX = 3,

    // eARNETWORKAL_FRAME_TYPE
    ARNETWORKAL_FRAME_TYPE_UNINITIALIZED = 0,
    ARNETWORKAL_FRAME_TYPE_ACK = 1,
    ARNETWORKAL_FRAME_TYPE_DATA = 2,
    ARNETWORKAL_FRAME_TYPE_DATA_LOW_LATENCY = 3,
    ARNETWORKAL_FRAME_TYPE_DATA_WITH_ACK = 4,
    ARNETWORKAL_FRAME_TYPE_MAX = 5,

    // ARNETWORKAL_Frame_t identifiers
    BD_NET_CD_NONACK_ID = 10,
    BD_NET_CD_ACK_ID = 11,
    BD_NET_CD_EMERGENCY_ID = 12,
    BD_NET_CD_VIDEO_ACK_ID = 13,
    BD_NET_DC_VIDEO_DATA_ID = 125,
    BD_NET_DC_EVENT_ID = 126,
    BD_NET_DC_NAVDATA_ID = 127;

function networkFrameGenerator() {
  //
  // ARNETWORKAL_Frame_t
  //
  // uint8  type  - frame type ARNETWORK_FRAME_TYPE
  // uint8  id    - identifier of the buffer sending the frame
  // uint8  seq   - sequence number of the frame
  // uint32 size  - size of the frame
  //

  // each frame id has it's own sequence number
  var seq = [];

  return function(cmd, type, id)  {
    var hlen = 7, // size of ARNETWORKAL_Frame_t header
        buf = new Buffer(hlen);

    type = type || ARNETWORKAL_FRAME_TYPE_DATA;
    id = id || BD_NET_CD_NONACK_ID;

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
    frame.data = buf.slice(7, frame.size);
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

  frame.frame = buf.slice(5);

  return frame;
}

function validatePitch(val) {
  if (val > 100) {
    return 100;
  } else if (val < 0) {
    return 0;
  } else {
    return val | 0
  }
}

var Bebop = module.exports = function(opts) {
  opts = opts || {};
  this.navData = {};
  this.ip = opts.ip || "192.168.42.1";
  this.c2dPort = opts.c2dPort || 54321;
  this.d2cPort = opts.d2cPort || 43210;
  this.discoveryPort = opts.discoveryPort || 44444;
  this._c2dClient = dgram.createSocket('udp4');
  this._d2cServer = dgram.createSocket('udp4');
  this._networkFrameGenerator = networkFrameGenerator();
  this._arstreamFrame = {
    frameNumber: 0,
    frameACK: new Buffer(16),
    frame: new Buffer([]),
  };
  this._pcmd = {};

  this._arstreamFrame.frameACK.fill(0);
}

util.inherits(Bebop, EventEmitter);

module.exports.createClient = function(opts) {
  return new Bebop(opts);
}

Bebop.prototype.connect = function(callback) {
  var discoveryClient = new net.Socket(),
      that = this;

  discoveryClient.connect(that.discoveryPort, that.ip, function() {
      discoveryClient.write(JSON.stringify({
        "controller_type":"computer",
        "controller_name":"node-bebop",
        "d2c_port":that.d2cPort.toString()
      }));
  });

  discoveryClient.on('error', function(err) {
      throw err;
  });

  discoveryClient.on('data', function(data) {
    discoveryClient.destroy();

    // nav and video
    that._d2cServer.bind(that.d2cPort);

    that._d2cServer.on('message', function (message) {
      var networkFrame = networkFrameParser(message);

      //
      // libARNetwork/Sources/ARNETWORK_Receiver.c#ARNETWORK_Receiver_ThreadRun
      //
      if (networkFrame.type === ARNETWORKAL_FRAME_TYPE_DATA_WITH_ACK) {
        that._writePacket(that._createAck(networkFrame));
      }

      if (networkFrame.type === ARNETWORKAL_FRAME_TYPE_DATA_LOW_LATENCY &&
          networkFrame.id === BD_NET_DC_VIDEO_DATA_ID)
      {
           var arstreamFrame = arstreamFrameParser(networkFrame.data);
           that._writePacket(that._createARStreamACK(arstreamFrame));
      }

      //
      // libARCommands/Sources/ARCOMMANDS_Decoder.c#ARCOMMANDS_Decoder_DecodeBuffer
      //
      if (networkFrame.id === BD_NET_DC_EVENT_ID) {
        var commandProject = networkFrame.data.readUInt8(0),
            commandClass = networkFrame.data.readUInt8(1),
            commandId = networkFrame.data.readUInt16LE(2);
        switch(commandProject) {
          case ARCOMMANDS_ID_PROJECT_COMMON:
            switch(commandClass) {
              case ARCOMMANDS_ID_COMMON_CLASS_COMMONSTATE:
                switch(commandId) {
                  case ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_BATTERYSTATECHANGED:
                    that.navData.battery = networkFrame.data.readUInt8(4);
                    that.emit('battery', that.navData.battery);
                  break;
                }
              break;
            }
          break;
          case ARCOMMANDS_ID_PROJECT_ARDRONE3:
            switch(commandClass) {
              case ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTINGSTATE:
                switch(commandId) {
                  case ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLATTRIMCHANGED:
                  break;
                  case ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLYINGSTATECHANGED:
                    switch(networkFrame.data.readInt32LE(4)) {
                      case ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDED:
                        that.navData.flyingState = { landed: true };
                        that.emit('landed');
                      break;
                      case ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_TAKINGOFF:
                        that.navData.flyingState = { takingOff: true };
                        that.emit('takingOff');
                      break;
                      case ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_HOVERING:
                        that.navData.flyingState = { hovering: true };
                        that.emit('hovering');
                      break;
                      case ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_FLYING:
                        that.navData.flyingState = { flying: true };
                        that.emit('flying');
                      break;
                      case ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDING:
                        that.navData.flyingState = { landing: true };
                        that.emit('landing');
                      break;
                      case ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_EMERGENCY:
                        that.navData.flyingState = { emergency: true };
                        that.emit('emergency');
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
      if (networkFrame.id === ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PING) {
        that.navData.flyingTime = networkFrame.data.readUInt32LE(0) + (networkFrame.data.readUInt32LE(4)/1000000000.0);
        that._writePacket(that._createPong(networkFrame));
      }
    });

    that._d2cServer.on('error', function (val) {
      throw err;
    });

    // commands
    that._c2dClient.on('error', function (err) {
        throw err;
    });

    // send pcmd values at 40hz
    setInterval(function() {
      that._writePacket(that._generatePCMD(that._pcmd));
    }, 25);

    that.generateAllStates();
    that.flatTrim();

    if (typeof callback === 'function') {
      callback();
    }

    that.emit('ready');
  });
}

Bebop.prototype.up = function(val) {
  this._pcmd.gaz = validatePitch(val);
  return this;
}

Bebop.prototype.down = function(val) {
  this._pcmd.gaz = validatePitch(val) * -1;
  return this;
}

Bebop.prototype.front = function(val) {
  return this.forward(val);
}

Bebop.prototype.forward = function(val) {
  this._pcmd.pitch = validatePitch(val);
  return this;
}

Bebop.prototype.back = function(val) {
  return this.backward(val);
}

Bebop.prototype.backward = function(val) {
  this._pcmd.pitch = validatePitch(val) * -1;
  return this;
}

Bebop.prototype.right = function(val) {
  this._pcmd.roll = validatePitch(val);
  return this;
}

Bebop.prototype.left = function(val) {
  this._pcmd.roll = validatePitch(val) * -1;
  return this;
}

Bebop.prototype.clockwise = function(val) {
  this._pcmd.yaw = validatePitch(val);
  return this;
}

Bebop.prototype.counterClockwise = function(val) {
  this._pcmd.yaw = validatePitch(val) * -1;
  return this;
}

Bebop.prototype.stop = function() {
  return this._pcmd = {};
  return this;
}

Bebop.prototype.frontFlip = function() {
  return this._animationsFlip(ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_FRONT);
}

Bebop.prototype.backFlip = function() {
  return this._animationsFlip(ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_BACK);
}

Bebop.prototype.rightFlip = function() {
  return this._animationsFlip(ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_RIGHT);
}

Bebop.prototype.leftFlip = function() {
  return this._animationsFlip(ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_LEFT);
}

Bebop.prototype._animationsFlip = function(direction) {
  //
  //  ARCOMMANDS_Generator_GenerateARDrone3AnimationsFlip
  //

  var buf = new Buffer(8);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_ANIMATIONS, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_ANIMATIONS_CMD_FLIP, 2);
  buf.writeUInt32LE(direction, 4);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
}

Bebop.prototype.takeoff = function(callback) {
  return this.takeOff(callback);
}

Bebop.prototype.takeOff = function(callback) {
  //
  //  ARCOMMANDS_Generator_GenerateARDrone3PilotingTakeOff
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_TAKEOFF, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  this.once('flying', callback || function() {});
  return this;
}

Bebop.prototype.land = function(callback) {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingLanding
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_LANDING, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  this.once('landed', callback || function() {});
  return this;
}

Bebop.prototype.emergency = function() {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingEmergency
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_EMERGENCY, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
}

Bebop.prototype.generateAllStates = function() {
  //
  // ARCOMMANDS_Generator_GenerateCommonCommonAllStates
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_COMMON, 0)
  buf.writeUInt8(ARCOMMANDS_ID_COMMON_CLASS_COMMON, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_COMMON_COMMON_CMD_ALLSTATES, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
}

Bebop.prototype.calibrate = function() {
  return this.flatTrim();
}

Bebop.prototype.flatTrim = function() {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingFlatTrim
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_FLATTRIM, 2);

  this._writePacket(this._networkFrameGenerator(buf));
  return this;
}

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
  var id = networkFrame.id + (ARNETWORKAL_MANAGER_DEFAULT_ID_MAX / 2)

  return this._networkFrameGenerator(buf, ARNETWORKAL_FRAME_TYPE_ACK, id);
}

Bebop.prototype._createPong = function(networkFrame) {
  return this._networkFrameGenerator(networkFrame.data, ARNETWORKAL_FRAME_TYPE_DATA, ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PONG);
}

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

  //
  // each bit in the highPacketsAck and lowPacketsAck correspond to the
  // fragmentsPerFrame which have been received per frameNumber, so time to
  // flip some bits!
  //
  if (arstreamFrame.frameNumber !== this._arstreamFrame.frameNumber) {
    if (this._arstreamFrame.frame.length > 0) {
      this.emit('video', this._arstreamFrame.frame);
    }
    this._arstreamFrame.frame = new Buffer(0);
    this._arstreamFrame.frameACK = new Buffer(16);
    this._arstreamFrame.frameACK.fill(0);
    this._arstreamFrame.frameNumber = arstreamFrame.frameNumber
  }

  this._arstreamFrame.frame = Buffer.concat([this._arstreamFrame.frame, arstreamFrame.frame]);

  var bufferPosition = arstreamFrame.fragmentNumber / 8 | 0;
  var tmp = this._arstreamFrame.frameACK.readUInt8(bufferPosition);

  tmp |= 1<<(arstreamFrame.fragmentNumber % 8)

  this._arstreamFrame.frameACK.writeUInt8(tmp, bufferPosition);

  // lowPacketsAck and highPacketsAck are stored contiguously
  // in a 16 byte buffer and then reordered accordingly for transport
  var ackPacket = {
    frameNumber: this._arstreamFrame.frameNumber,
    packetsACK: Buffer.concat([this._arstreamFrame.frameACK.slice(8), this._arstreamFrame.frameACK.slice(0,8)]),
  };

  var ret = new Buffer(18);
  ret.fill(0);
  ret.writeUInt16LE(ackPacket.frameNumber, 0);
  ackPacket.packetsACK.copy(ret, 2);

  return this._networkFrameGenerator(ret, ARNETWORKAL_FRAME_TYPE_DATA, BD_NET_CD_VIDEO_ACK_ID);
}

Bebop.prototype._generatePCMD = function(opts) {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingPCMD
  //
  // uint8 - flag Boolean flag to activate roll/pitch movement
  // int8  - roll Roll consign for the drone [-100;100]
  // int8  - pitch Pitch consign for the drone [-100;100]
  // int8  - yaw Yaw consign for the drone [-100;100]
  // int8  - gaz Gaz consign for the drone [-100;100]
  // float - psi [NOT USED] - Magnetic north heading of the controlling device (deg) [-180;180]
  //

  var buf = new Buffer(13);

  this._pcmd = opts || {}

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_PCMD, 2);
  buf.writeUInt8(opts.flag || 1, 4);
  buf.writeInt8(opts.roll || 0, 5);
  buf.writeInt8(opts.pitch || 0, 6);
  buf.writeInt8(opts.yaw || 0, 7);
  buf.writeInt8(opts.gaz || 0, 8);
  buf.writeFloatLE(opts.psi || 0.0, 9);

  return this._networkFrameGenerator(buf);
}

Bebop.prototype._writePacket = function(packet) {
  this._c2dClient.send(packet, 0, packet.length, this.c2dPort, this.ip,
    function(err) {
      if (err) throw err;
    }
  );
}
