

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PilotingSettings = module.exports = function(self) {
  this.self = self;
};

PilotingSettings.prototype.MaxAltitude = function(current) {

  var buffer = commandToBuffer(0, "PilotingSettings", "MaxAltitude", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.MaxTilt = function(current) {

  var buffer = commandToBuffer(0, "PilotingSettings", "MaxTilt", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.AbsolutControl = function(on) {

  var buffer = commandToBuffer(0, "PilotingSettings", "AbsolutControl", on);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.MaxDistance = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "MaxDistance", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.NoFlyOverMaxDistance = function(shouldNotFlyOver) {

  var buffer = commandToBuffer(0, "PilotingSettings", "NoFlyOverMaxDistance", shouldNotFlyOver);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxHorizontalSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxHorizontalSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxVerticalSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxVerticalSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxHorizontalAcceleration = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxHorizontalAcceleration", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxVerticalAcceleration = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxVerticalAcceleration", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxRotationSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "setAutonomousFlightMaxRotationSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
