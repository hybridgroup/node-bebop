'use strict';

var net = require("net"),
    dgram = require('dgram'),

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

function frameGenerator() {
  //
  // ARNETWORKAL_Frame_t
  //
  // uint8  type  - frame type ARNETWORK_FRAME_TYPE
  // uint8  id    - identifier of the buffer sending the frame
  // uint8  seq   - sequence number of the frame
  // uint32 size  - size of the frame
  //

  var seq = 0x00;

  return function(cmd)  {
    var hlen = 7, // size of ARNETWORKAL_Frame_t header
        type = ARNETWORKAL_FRAME_TYPE_DATA,
        id = BD_NET_CD_NONACK_ID,
        buf = new Buffer(hlen);

    seq++;

    if (seq > 255) {
      seq = 0;
    }

    buf.writeUInt8(type, 0);
    buf.writeUInt8(id, 1);
    buf.writeUInt8(seq, 2);
    buf.writeUInt32LE(cmd.length + hlen, 3);

    return Buffer.concat([buf, cmd]);
  };
}

var Bebop = module.exports = function(opts) {
  opts = opts || {};
  this.host = opts.host || "192.168.42.1";
  this.c2dPort = opts.c2dPort || 54321;
  this.d2cPort = opts.d2cPort || 43210;
  this.discoveryPort = opts.discoveryPort || 44444;
  this.bdCommand = new Buffer(0);
  this._c2dClient = dgram.createSocket('udp4');
  this._d2cServer = dgram.createSocket('udp4');
  this._generator = frameGenerator();
}

module.exports.createClient = function(opts) {
  return new Bebop(opts);
}

Bebop.prototype.connect = function(cb) {
  var discoveryClient = new net.Socket(),
      that = this;

  that.generateAllStates();

  discoveryClient.connect(that.discoveryPort, that.host, function() {
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

    // nav
    that._d2cServer.bind(that.d2cPort);

    that._d2cServer.on('message', function (message) {
      // TODO parse nav data
    });

    that._d2cServer.on('error', function (val) {
      throw err;
    });

    // commands
    that._c2dClient.on('error', function (err) {
        throw err;
    });

    setInterval(function() {
      that._c2dClient.send(
        that.bdCommand,
        0,
        that.bdCommand.length,
        that.c2dPort,
        that.host,
        function(err, bytes) {
          if (err) throw err;
        }
      );
    }, 25);

    setTimeout(function() {
      cb();
    }, 200);
  });
}

Bebop.prototype.up = function(val) {
  return this.pcmd({gaz: val});
}

Bebop.prototype.down = function(val) {
  return this.pcmd({gaz: val * -1});
}

Bebop.prototype.forward = function(val) {
  return this.pcmd({flag: 1, pitch: val});
}

Bebop.prototype.backward = function(val) {
  return this.pcmd({flag: 1, pitch: val * -1});
}

Bebop.prototype.right = function(val) {
  return this.pcmd({flag: 1, roll: val});
}

Bebop.prototype.left = function(val) {
  return this.pcmd({flag: 1, roll: val * -1});
}

Bebop.prototype.clockwise = function(val) {
  return this.pcmd({yaw: val});
}

Bebop.prototype.counterClockwise = function(val) {
  return this.pcmd({yaw: val * -1});
}

Bebop.prototype.stop = function() {
  return this.pcmd();
}

Bebop.prototype.pcmd = function(opts) {
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

  opts = opts || {};

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_PCMD, 2);
  buf.writeUInt8(opts.flag || 0, 4);
  buf.writeInt8(opts.roll || 0, 5);
  buf.writeInt8(opts.pitch || 0, 6);
  buf.writeInt8(opts.yaw || 0, 7);
  buf.writeInt8(opts.gaz || 0, 8);
  buf.writeFloatLE(opts.psi || 0.0, 9);

  this.bdCommand = this._generator(buf);
  return this;
}

Bebop.prototype.takeOff = function() {
  //
  //  ARCOMMANDS_Generator_GenerateARDrone3PilotingTakeOff
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_TAKEOFF, 2);

  this.bdCommand = this._generator(buf);
  return this;
}

Bebop.prototype.land = function() {
  //
  // ARCOMMANDS_Generator_GenerateARDrone3PilotingLanding
  //

  var buf = new Buffer(4);

  buf.writeUInt8(ARCOMMANDS_ID_PROJECT_ARDRONE3, 0)
  buf.writeUInt8(ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING, 1);
  buf.writeUInt16LE(ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_LANDING, 2);

  this.bdCommand = this._generator(buf);
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

  this.bdCommand = this._generator(buf);
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

  this.bdCommand = this._generator(buf);
  return this;
}
