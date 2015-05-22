var bebop = require("../"),
    expect = require("chai").expect,
    assert = require("chai").assert,
    sinon = require("sinon");

describe('Bebop', function(){
  var drone;

  beforeEach(function() {
    drone = bebop.createClient();
  });

  it("#createClient", function() {
    assert.typeOf(drone, 'object');
  });

  describe('pcmd functions', function() {
    describe('pitch validator', function() {
      it('should not allow values greater than 100', function() {
        drone.up(120);
        expect(drone._pcmd.gaz).to.equal(100);
      });

      it('should not allow values less than 0', function() {
        drone.up(-30);
        expect(drone._pcmd.gaz).to.equal(0);
      });

      it('should trim floating point values', function() {
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
        sinon.spy(drone, 'forward');
        drone.front();
        expect(drone.forward.calledOnce).to.equal(true);
      });

      it("#forward", function() {
        drone.forward(90);
        expect(drone._pcmd.pitch).to.equal(90);
      });

      it("#back", function() {
        sinon.spy(drone, 'backward');
        drone.back();
        expect(drone.backward.calledOnce).to.equal(true);
      });

      it("#forward", function() {
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
  });

  describe("commands", function() {
    beforeEach(function() {
      sinon.spy(drone, '_networkFrameGenerator');
    });

    describe('flip commands', function() {
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
        sinon.spy(drone, 'takeOff');
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
        sinon.spy(drone, 'flatTrim');
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
        expect(buf.readUInt16LE(2)).to.equal(bebop.constants.ARCOMMANDS_ID_COMMON_COMMON_CMD_ALLSTATES);
      });
    });
  });
})
