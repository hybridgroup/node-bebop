

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PilotingSettings = module.exports = function(self) {
  this.self = self;
};

PilotingSettings.prototype.maxAltitude = function(current) {

  var buffer = commandToBuffer(1, "PilotingSettings", "MaxAltitude", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.maxTilt = function(current) {

  var buffer = commandToBuffer(1, "PilotingSettings", "MaxTilt", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.absolutControl = function(on) {

  var buffer = commandToBuffer(1, "PilotingSettings", "AbsolutControl", on);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.maxDistance = function(value) {

  var buffer = commandToBuffer(1, "PilotingSettings", "MaxDistance", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.noFlyOverMaxDistance = function(shouldNotFlyOver) {

  var buffer = commandToBuffer(1, "PilotingSettings", "NoFlyOverMaxDistance", shouldNotFlyOver);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxHorizontalSpeed = function(value) {

  var buffer = commandToBuffer(1, "PilotingSettings", "setAutonomousFlightMaxHorizontalSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxVerticalSpeed = function(value) {

  var buffer = commandToBuffer(1, "PilotingSettings", "setAutonomousFlightMaxVerticalSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxHorizontalAcceleration = function(value) {

  var buffer = commandToBuffer(1, "PilotingSettings", "setAutonomousFlightMaxHorizontalAcceleration", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxVerticalAcceleration = function(value) {

  var buffer = commandToBuffer(1, "PilotingSettings", "setAutonomousFlightMaxVerticalAcceleration", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.setAutonomousFlightMaxRotationSpeed = function(value) {

  var buffer = commandToBuffer(1, "PilotingSettings", "setAutonomousFlightMaxRotationSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
