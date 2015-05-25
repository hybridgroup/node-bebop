"use strict";

process.env.NODE_ENV = "test";

var bebop = require("../"),
    expect = require("chai").expect,
    assert = require("chai").assert,
    sinon = require("sinon");

describe("Bebop", function() {
  var drone;

  beforeEach(function() {
    drone = bebop.createClient();
  });

  it("#createClient", function() {
    assert.typeOf(drone, "object");
  });

  it("#getVideoStream", function() {
    var output;

    var stream = drone.getVideoStream();

    stream.on("data", function(buf) {
      output = buf;
    });

    drone.emit("video", new Buffer([0xff]));

    expect(output[0]).to.equal(0xff);
  });

  it("#getMjpegStream", function() {
    var output;

    var stream = drone.getMjpegStream();

    stream.on("data", function(buf) {
      output = buf;
    });

    drone.emit("video", new Buffer([0xff]));

    expect(output[0]).to.equal(0xff);
  });

  describe("packet receiver and parser", function() {
    beforeEach(function() {
      sinon.spy(drone, "_writePacket");
    });

    it("should create an ACK for packets which request an ACK", function() {
      var size = 7,
          packetBuf = new Buffer(size),
          type = bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA_WITH_ACK,
          id = 99,
          seq = 10;

      packetBuf.writeUInt8(type, 0);
      packetBuf.writeUInt8(id, 1);
      packetBuf.writeUInt8(seq, 2);
      packetBuf.writeUInt32LE(size, 3);

      drone._packetReceiver(packetBuf);

      var frameBuf = drone._writePacket.getCall(0).args[0];

      expect(frameBuf.readUInt8(0)).to.equal(bebop.constants.ARNETWORKAL_FRAME_TYPE_ACK);
      expect(frameBuf.readUInt8(7)).to.equal(seq);
    });

    describe("ACK for video frames", function() {
      var packetBuf;

      beforeEach(function() {
        var size = 13,
            type = bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA_LOW_LATENCY,
            id = bebop.constants.BD_NET_DC_VIDEO_DATA_ID,
            seq = 10,
            frameNumber = 1,
            frameFlags = 0,
            fragmentNumber = 0,
            fragmentsPerFrame = 100,
            frame = 0xff;

        packetBuf = new Buffer(size);

        packetBuf.writeUInt8(type, 0);
        packetBuf.writeUInt8(id, 1);
        packetBuf.writeUInt8(seq, 2);
        packetBuf.writeUInt32LE(size, 3);
        packetBuf.writeUInt16LE(frameNumber, 7);
        packetBuf.writeUInt8(frameFlags, 9);
        packetBuf.writeUInt8(fragmentNumber, 10);
        packetBuf.writeUInt8(fragmentsPerFrame, 11);
        packetBuf.writeUInt8(frame, 12);
      });

      it("should set the proper ack type and id", function() {
        drone._packetReceiver(packetBuf);

        var frameBuf = drone._writePacket.getCall(0).args[0];

        expect(frameBuf.readUInt8(0)).to.equal(bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA);
        expect(frameBuf.readUInt8(1)).to.equal(bebop.constants.BD_NET_CD_VIDEO_ACK_ID);
      });

      it("should flip a lowPacketsAck bit", function() {
        var fragmentNumber = 0;

        packetBuf.writeUInt16LE(fragmentNumber, 10);

        drone._packetReceiver(packetBuf);
        var frameBuf = drone._writePacket.getCall(0).args[0];

        expect(frameBuf.readUInt8(17)).to.equal(1);
      });

      it("should flip a highPacketsAck bit", function() {
        var fragmentNumber = 64;

        packetBuf.writeUInt16LE(fragmentNumber, 10);

        drone._packetReceiver(packetBuf);
        var frameBuf = drone._writePacket.getCall(0).args[0];

        expect(frameBuf.readUInt8(9)).to.equal(1);
      });
    });

    it("should pong the pings", function() {
      var size = 15,
          packetBuf = new Buffer(size),
          type = bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA,
          id = bebop.constants.ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PING,
          seq = 10;

      packetBuf.writeUInt8(type, 0);
      packetBuf.writeUInt8(id, 1);
      packetBuf.writeUInt8(seq, 2);
      packetBuf.writeUInt32LE(size, 3);

      drone._packetReceiver(packetBuf);

      var frameBuf = drone._writePacket.getCall(0).args[0];

      expect(frameBuf.readUInt8(0)).to.equal(bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA);
      expect(frameBuf.readUInt8(1)).to.equal(bebop.constants.ARNETWORK_MANAGER_INTERNAL_BUFFER_ID_PONG);
    });

    describe("events", function() {
      it("should report battery", function() {
        var size = 12,
            packetBuf = new Buffer(size),
            type = bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA,
            id = bebop.constants.BD_NET_DC_EVENT_ID,
            seq = 10,
            commandProject = bebop.constants.ARCOMMANDS_ID_PROJECT_COMMON,
            commandClass = bebop.constants.ARCOMMANDS_ID_COMMON_CLASS_COMMONSTATE,
            commandId = bebop.constants.ARCOMMANDS_ID_COMMON_COMMONSTATE_CMD_BATTERYSTATECHANGED,
            level = 90;

        packetBuf.writeUInt8(type, 0);
        packetBuf.writeUInt8(id, 1);
        packetBuf.writeUInt8(seq, 2);
        packetBuf.writeUInt32LE(size, 3);
        packetBuf.writeUInt8(commandProject, 7);
        packetBuf.writeUInt8(commandClass, 8);
        packetBuf.writeUInt16LE(commandId, 9);
        packetBuf.writeUInt8(level, 11);

        drone._packetReceiver(packetBuf);

        expect(drone.navData.battery).to.equal(level);
      });
      describe("piloting state", function() {
        var packetBuf;
        beforeEach(function() {
          var size = 15,
              type = bebop.constants.ARNETWORKAL_FRAME_TYPE_DATA,
              id = bebop.constants.BD_NET_DC_EVENT_ID,
              seq = 10,
              commandProject = bebop.constants.ARCOMMANDS_ID_PROJECT_ARDRONE3,
              commandClass = bebop.constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTINGSTATE,
              commandId = bebop.constants.ARCOMMANDS_ID_ARDRONE3_PILOTINGSTATE_CMD_FLYINGSTATECHANGED;

          packetBuf = new Buffer(size);

          packetBuf.writeUInt8(type, 0);
          packetBuf.writeUInt8(id, 1);
          packetBuf.writeUInt8(seq, 2);
          packetBuf.writeUInt32LE(size, 3);
          packetBuf.writeUInt8(commandProject, 7);
          packetBuf.writeUInt8(commandClass, 8);
          packetBuf.writeUInt16LE(commandId, 9);

        });

        it("should report landed", function() {
          packetBuf.writeUInt32LE(bebop.constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDED, 11);
          drone._packetReceiver(packetBuf);
          expect(drone.navData.flyingState.landed).to.equal(true);
        });

        it("should report taking off", function() {
          packetBuf.writeUInt32LE(bebop.constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_TAKINGOFF, 11);
          drone._packetReceiver(packetBuf);
          expect(drone.navData.flyingState.takingOff).to.equal(true);
        });

        it("should report hovering", function() {
          packetBuf.writeUInt32LE(bebop.constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_HOVERING, 11);
          drone._packetReceiver(packetBuf);
          expect(drone.navData.flyingState.hovering).to.equal(true);
        });

        it("should report flying", function() {
          packetBuf.writeUInt32LE(bebop.constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_FLYING, 11);
          drone._packetReceiver(packetBuf);
          expect(drone.navData.flyingState.flying).to.equal(true);
        });

        it("should report landing", function() {
          packetBuf.writeUInt32LE(bebop.constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_LANDING, 11);
          drone._packetReceiver(packetBuf);
          expect(drone.navData.flyingState.landing).to.equal(true);
        });

        it("should report emergency", function() {
          packetBuf.writeUInt32LE(bebop.constants.ARCOMMANDS_ARDRONE3_PILOTINGSTATE_FLYINGSTATECHANGED_STATE_EMERGENCY, 11);
          drone._packetReceiver(packetBuf);
          expect(drone.navData.flyingState.emergency).to.equal(true);
        });
      });
    });
  });

  describe("network frame generator", function() {
    it("should increase seq number", function() {
      sinon.spy(drone, "_writePacket");

      drone.takeOff();
      drone.takeOff();

      var frame1 = drone._writePacket.getCall(0).args[0];

      expect(frame1[2]).to.equal(1);

      var frame2 = drone._writePacket.getCall(1).args[0];

      expect(frame2[2]).to.equal(2);
    });
  });

  describe("pcmd functions", function() {
    describe("pitch validator", function() {
      it("should not allow values greater than 100", function() {
        drone.up(120);
        expect(drone._pcmd.gaz).to.equal(100);
      });

      it("should not allow values less than 0", function() {
        drone.up(-30);
        expect(drone._pcmd.gaz).to.equal(0);
      });

      it("should trim floating point values", function() {
        drone.up(50.1282393);
        expect(drone._pcmd.gaz).to.equal(50);
      });
    });

    describe("gaz", function() {
      it("#up", function() {
        drone.up(50);
        expect(drone._pcmd.gaz).to.equal(50);
      });
      it("#down", function() {
        drone.down(30);
        expect(drone._pcmd.gaz).to.equal(-30);
      });
    });

    describe("pitch", function() {
      it("#front", function() {
        sinon.spy(drone, "forward");
        drone.front();
        expect(drone.forward.calledOnce).to.equal(true);
      });

      it("#forward", function() {
        drone.forward(90);
        expect(drone._pcmd.pitch).to.equal(90);
      });

      it("#back", function() {
        sinon.spy(drone, "backward");
        drone.back();
        expect(drone.backward.calledOnce).to.equal(true);
      });

      it("#backward", function() {
        drone.backward(50);
        expect(drone._pcmd.pitch).to.equal(-50);
      });
    });

    describe("roll", function() {
      it("#right", function() {
        drone.right(70);
        expect(drone._pcmd.roll).to.equal(70);
      });

      it("#left", function() {
        drone.left(70);
        expect(drone._pcmd.roll).to.equal(-70);
      });

    });

    describe("yaw", function() {
      it("#clockwise", function() {
        drone.clockwise(70);
        expect(drone._pcmd.yaw).to.equal(70);
      });

      it("#counterClockwise", function() {
        drone.counterClockwise(70);
        expect(drone._pcmd.yaw).to.equal(-70);
      });
    });

    it("#stop", function() {
      drone.stop();

      expect(drone._pcmd.yaw).to.equal(0);
      expect(drone._pcmd.roll).to.equal(0);
      expect(drone._pcmd.pitch).to.equal(0);
      expect(drone._pcmd.gaz).to.equal(0);
    });

    describe("#_generatePCMD", function() {
      beforeEach(function() {
        sinon.spy(drone, "_networkFrameGenerator");
      });

      it("should generate pcmd command", function() {
        var frame = drone._generatePCMD();
        expect(Buffer.isBuffer(frame)).to.equal(true);

        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);

        var buf = drone._networkFrameGenerator.getCall(0).args[0];

        expect(buf.readUInt8(0)).to.equal(bebop.constants.ARCOMMANDS_ID_PROJECT_ARDRONE3);
        expect(buf.readUInt8(1)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_PCMD);
      });

      it("should set the proper pcmd values", function() {
        var pcmd = {
          roll: 10,
          pitch: 9,
          yaw: 80,
          gaz: 30
        };

        drone._generatePCMD(pcmd);

        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);

        var buf = drone._networkFrameGenerator.getCall(0).args[0];

        expect(buf.readUInt8(5)).to.equal(pcmd.roll);
        expect(buf.readUInt8(6)).to.equal(pcmd.pitch);
        expect(buf.readUInt8(7)).to.equal(pcmd.yaw);
        expect(buf.readUInt8(8)).to.equal(pcmd.gaz);
      });
    });
  });

  describe("commands", function() {
    beforeEach(function() {
      sinon.spy(drone, "_networkFrameGenerator");
    });

    describe("flip commands", function() {
      var verify = function(buf) {
        expect(buf.readUInt8(0)).to.equal(bebop.constants.ARCOMMANDS_ID_PROJECT_ARDRONE3);
        expect(buf.readUInt8(1)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_CLASS_ANIMATIONS);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_ANIMATIONS_CMD_FLIP);
      };

      it("#frontFlip", function() {
        drone.frontFlip();
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);

        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        verify(buf);
        expect(buf.readUInt32LE(4)).to.equal(bebop.constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_FRONT);
      });
      it("#backFlip", function() {
        drone.backFlip();
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);

        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        verify(buf);
        expect(buf.readUInt32LE(4)).to.equal(bebop.constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_BACK);
      });
      it("#rightFlip", function() {
        drone.rightFlip();
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);

        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        verify(buf);
        expect(buf.readUInt32LE(4)).to.equal(bebop.constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_RIGHT);
      });
      it("#leftFlip", function() {
        drone.leftFlip();
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);

        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        verify(buf);
        expect(buf.readUInt32LE(4)).to.equal(bebop.constants.ARCOMMANDS_ARDRONE3_ANIMATIONS_FLIP_DIRECTION_LEFT);
      });
    });

    describe("ardrone3 piloting commands", function() {
      var verify = function(buf) {
        expect(buf.readUInt8(0)).to.equal(bebop.constants.ARCOMMANDS_ID_PROJECT_ARDRONE3);
        expect(buf.readUInt8(1)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_CLASS_PILOTING);
      };

      it("#takeoff", function() {
        sinon.spy(drone, "takeOff");
        drone.takeoff();
        expect(drone.takeOff.calledOnce).to.equal(true);
      });

      it("#takeOff", function() {
        drone.takeOff();
        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);
        verify(buf);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_TAKEOFF);
      });

      it("#land", function() {
        drone.land();
        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);
        verify(buf);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_LANDING);
      });

      it("#calibrate", function() {
        sinon.spy(drone, "flatTrim");
        drone.calibrate();
        expect(drone.flatTrim.calledOnce).to.equal(true);
      });

      it("#flatTrim", function() {
        drone.flatTrim();
        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);
        verify(buf);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_FLATTRIM);
      });

      it("#emergency", function() {
        drone.emergency();
        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);
        verify(buf);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_ARDRONE3_PILOTING_CMD_EMERGENCY);
      });

    });

    describe("common commands", function() {
      var verify = function(buf) {
        expect(buf.readUInt8(0)).to.equal(bebop.constants.ARCOMMANDS_ID_PROJECT_COMMON);
        expect(buf.readUInt8(1)).to.equal(bebop.constants.ARCOMMANDS_ID_COMMON_CLASS_COMMON);
      };

      it("#generateAllStates", function() {
        drone.generateAllStates();
        var buf = drone._networkFrameGenerator.getCall(0).args[0];
        expect(drone._networkFrameGenerator.calledOnce).to.equal(true);
        verify(buf);
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_COMMON_COMMON_CMD_ALLSTATES);
      });
    });
  });
});
