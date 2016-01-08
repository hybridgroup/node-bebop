"use strict";

var EventEmitter = require("events").EventEmitter,
    dgram = require("dgram"),
    util = require("util"),
    net = require("net"),
    through = require("through"),
    ffmpeg = require("./ffmpeg-shim"),
    constants = require("./constants"),
    commands = require("./commands"),
    types = require("./types"),
    commandToBuffer = require("./commandToBuffer"),
    GPSSettings = require("./gpssettings");

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
  this.GPSSettings = new GPSSettings(this);
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

  if (networkFrame.id === constants.BD_NET_DC_EVENT_ID ||
      networkFrame.id === constants.BD_NET_DC_NAVDATA_ID) {

    var commandProject = networkFrame.data.readUInt8(0),
        commandClass = networkFrame.data.readUInt8(1),
        commandId = networkFrame.data.readUInt16LE(2);

    var offset = 4;
    var args = {};

    var event = commands
      .first({_id: commandProject}).class
      .first({_id: commandClass}).cmd;

    if (event instanceof Array) {
      event = event[commandId];
    }

    if (typeof event.arg !== "undefined") {
      if (event.arg instanceof Array) {
        event.arg.forEach(function(arg) {
          if (types.hasOwnProperty(arg._type)) {
            args[arg._name] = types[arg._type]
              .read(networkFrame.data, offset, arg);

            offset += types[arg._type].length;
          }
        });
      }
      else if (event.arg instanceof Object) {
        if (types.hasOwnProperty(event.arg._type)) {
          args[event.arg._name] = types[event.arg._type]
            .read(networkFrame.data, offset, event.arg);
        }
      }
    }

    this.emit(event._name, args);

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
Bebop.prototype.Piloting = {};
Bebop.prototype.Piloting.FlatTrim = function() {

  var buffer = commandToBuffer(0, "Piloting", "FlatTrim");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.TakeOff = function() {

  var buffer = commandToBuffer(0, "Piloting", "TakeOff");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.PCMD = function(obj) {

  var buffer = commandToBuffer(0, "Piloting", "PCMD", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.Landing = function() {

  var buffer = commandToBuffer(0, "Piloting", "Landing");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.Emergency = function() {

  var buffer = commandToBuffer(0, "Piloting", "Emergency");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.NavigateHome = function(start) {

  var buffer = commandToBuffer(0, "Piloting", "NavigateHome", start);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.AutoTakeOffMode = function(state) {

  var buffer = commandToBuffer(0, "Piloting", "AutoTakeOffMode", state);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Piloting.moveBy = function(obj) {

  var buffer = commandToBuffer(0, "Piloting", "moveBy", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Animations = {};
Bebop.prototype.Animations.Flip = function(direction) {

  var buffer = commandToBuffer(0, "Animations", "Flip", direction);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Camera = {};
Bebop.prototype.Camera.Orientation = function(obj) {

  var buffer = commandToBuffer(0, "Camera", "Orientation", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.MediaRecord = {};
Bebop.prototype.MediaRecord.Picture = function(massStorageId) {

  var buffer = commandToBuffer(0, "MediaRecord", "Picture", massStorageId);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.MediaRecord.Video = function(obj) {

  var buffer = commandToBuffer(0, "MediaRecord", "Video", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.MediaRecord.PictureV2 = function() {

  var buffer = commandToBuffer(0, "MediaRecord", "PictureV2");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.MediaRecord.VideoV2 = function(record) {

  var buffer = commandToBuffer(0, "MediaRecord", "VideoV2", record);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Network = {};
Bebop.prototype.Network.WifiScan = function(band) {

  var buffer = commandToBuffer(0, "Network", "WifiScan", band);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Network.WifiAuthChannel = function() {

  var buffer = commandToBuffer(0, "Network", "WifiAuthChannel");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings = {};
Bebop.prototype.PilotingSettings.MaxAltitude = function(current) {

  var buffer = commandToBuffer(0, "PilotingSettings", "MaxAltitude", current);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.MaxTilt = function(current) {

  var buffer = commandToBuffer(0, "PilotingSettings", "MaxTilt", current);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.AbsolutControl = function(on) {

  var buffer = commandToBuffer(0, "PilotingSettings", "AbsolutControl", on);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.MaxDistance = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "MaxDistance", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.NoFlyOverMaxDistance = function(shouldNotFlyOver) {

  var buffer = commandToBuffer(0, "PilotingSettings", "NoFlyOverMaxDistance", shouldNotFlyOver);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.setAutonomousFlightMaxHorizontalSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxHorizontalSpeed", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.setAutonomousFlightMaxVerticalSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxVerticalSpeed", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.setAutonomousFlightMaxHorizontalAcceleration = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxHorizontalAcceleration", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.setAutonomousFlightMaxVerticalAcceleration = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxVerticalAcceleration", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PilotingSettings.setAutonomousFlightMaxRotationSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxRotationSpeed", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.SpeedSettings = {};
Bebop.prototype.SpeedSettings.MaxVerticalSpeed = function(current) {

  var buffer = commandToBuffer(0, "SpeedSettings", "MaxVerticalSpeed", current);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.SpeedSettings.MaxRotationSpeed = function(current) {

  var buffer = commandToBuffer(0, "SpeedSettings", "MaxRotationSpeed", current);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.SpeedSettings.HullProtection = function(present) {

  var buffer = commandToBuffer(0, "SpeedSettings", "HullProtection", present);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.SpeedSettings.Outdoor = function(outdoor) {

  var buffer = commandToBuffer(0, "SpeedSettings", "Outdoor", outdoor);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.NetworkSettings = {};
Bebop.prototype.NetworkSettings.WifiSelection = function(obj) {

  var buffer = commandToBuffer(0, "NetworkSettings", "WifiSelection", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PictureSettings = {};
Bebop.prototype.PictureSettings.PictureFormatSelection = function(type) {

  var buffer = commandToBuffer(0, "PictureSettings", "PictureFormatSelection", type);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PictureSettings.AutoWhiteBalanceSelection = function(type) {

  var buffer = commandToBuffer(0, "PictureSettings", "AutoWhiteBalanceSelection", type);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PictureSettings.ExpositionSelection = function(value) {

  var buffer = commandToBuffer(0, "PictureSettings", "ExpositionSelection", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PictureSettings.SaturationSelection = function(value) {

  var buffer = commandToBuffer(0, "PictureSettings", "SaturationSelection", value);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PictureSettings.TimelapseSelection = function(obj) {

  var buffer = commandToBuffer(0, "PictureSettings", "TimelapseSelection", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.PictureSettings.VideoAutorecordSelection = function(obj) {

  var buffer = commandToBuffer(0, "PictureSettings", "VideoAutorecordSelection", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.MediaStreaming = {};
Bebop.prototype.MediaStreaming.VideoEnable = function(enable) {

  var buffer = commandToBuffer(0, "MediaStreaming", "VideoEnable", enable);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Antiflickering = {};
Bebop.prototype.Antiflickering.electricFrequency = function(frequency) {

  var buffer = commandToBuffer(0, "Antiflickering", "electricFrequency", frequency);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Antiflickering.setMode = function(mode) {

  var buffer = commandToBuffer(0, "Antiflickering", "setMode", mode);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Network = {};
Bebop.prototype.Network.Disconnect = function() {

  var buffer = commandToBuffer(0, "Network", "Disconnect");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Settings = {};
Bebop.prototype.Settings.AllSettings = function() {

  var buffer = commandToBuffer(0, "Settings", "AllSettings");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Settings.Reset = function() {

  var buffer = commandToBuffer(0, "Settings", "Reset");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Settings.ProductName = function(name) {

  var buffer = commandToBuffer(0, "Settings", "ProductName", name);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Settings.Country = function(code) {

  var buffer = commandToBuffer(0, "Settings", "Country", code);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Settings.AutoCountry = function(automatic) {

  var buffer = commandToBuffer(0, "Settings", "AutoCountry", automatic);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Common = {};
Bebop.prototype.Common.AllStates = function() {

  var buffer = commandToBuffer(0, "Common", "AllStates");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Common.CurrentDate = function(date) {

  var buffer = commandToBuffer(0, "Common", "CurrentDate", date);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Common.CurrentTime = function(time) {

  var buffer = commandToBuffer(0, "Common", "CurrentTime", time);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Common.Reboot = function() {

  var buffer = commandToBuffer(0, "Common", "Reboot");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.OverHeat = {};
Bebop.prototype.OverHeat.SwitchOff = function() {

  var buffer = commandToBuffer(0, "OverHeat", "SwitchOff");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.OverHeat.Ventilate = function() {

  var buffer = commandToBuffer(0, "OverHeat", "Ventilate");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.WifiSettings = {};
Bebop.prototype.WifiSettings.OutdoorSetting = function(outdoor) {

  var buffer = commandToBuffer(0, "WifiSettings", "OutdoorSetting", outdoor);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Mavlink = {};
Bebop.prototype.Mavlink.Start = function(obj) {

  var buffer = commandToBuffer(0, "Mavlink", "Start", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Mavlink.Pause = function() {

  var buffer = commandToBuffer(0, "Mavlink", "Pause");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Mavlink.Stop = function() {

  var buffer = commandToBuffer(0, "Mavlink", "Stop");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Calibration = {};
Bebop.prototype.Calibration.MagnetoCalibration = function(calibrate) {

  var buffer = commandToBuffer(0, "Calibration", "MagnetoCalibration", calibrate);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.GPS = {};
Bebop.prototype.GPS.ControllerPositionForRun = function(obj) {

  var buffer = commandToBuffer(0, "GPS", "ControllerPositionForRun", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.FlightPlanEvent = {};
Bebop.prototype.FlightPlanEvent.StartingErrorEvent = function() {

  var buffer = commandToBuffer(0, "FlightPlanEvent", "StartingErrorEvent");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.FlightPlanEvent.SpeedBridleEvent = function() {

  var buffer = commandToBuffer(0, "FlightPlanEvent", "SpeedBridleEvent");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Audio = {};
Bebop.prototype.Audio.ControllerReadyForStreaming = function(ready) {

  var buffer = commandToBuffer(0, "Audio", "ControllerReadyForStreaming", ready);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Headlights = {};
Bebop.prototype.Headlights.intensity = function(obj) {

  var buffer = commandToBuffer(0, "Headlights", "intensity", obj);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Animations = {};
Bebop.prototype.Animations.StartAnimation = function(anim) {

  var buffer = commandToBuffer(0, "Animations", "StartAnimation", anim);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Animations.StopAnimation = function(anim) {

  var buffer = commandToBuffer(0, "Animations", "StopAnimation", anim);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Animations.StopAllAnimations = function() {

  var buffer = commandToBuffer(0, "Animations", "StopAllAnimations");

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Accessory = {};
Bebop.prototype.Accessory.Config = function(accessory) {

  var buffer = commandToBuffer(0, "Accessory", "Config", accessory);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
};

Bebop.prototype.Charger = {};
Bebop.prototype.Charger.SetMaxChargeRate = function(rate) {

  var buffer = commandToBuffer(0, "Charger", "SetMaxChargeRate", rate);

  this._writePacket(this._networkFrameGenerator(buffer));
  return this;
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
