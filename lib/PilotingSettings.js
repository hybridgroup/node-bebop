

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PilotingSettings = module.exports = function(self) {
  this.self = self;
};

PilotingSettings.prototype.maxAltitude = function(current) {

  var buffer = commandToBuffer(0, "PilotingSettings", "maxAltitude", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.maxTilt = function(current) {

  var buffer = commandToBuffer(0, "PilotingSettings", "maxTilt", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.absolutControl = function(on) {

  var buffer = commandToBuffer(0, "PilotingSettings", "absolutControl", on);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.maxDistance = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettings", "maxDistance", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettings.prototype.noFlyOverMaxDistance = function(shouldNotFlyOver) {

  var buffer = commandToBuffer(0, "PilotingSettings", "noFlyOverMaxDistance", shouldNotFlyOver);

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
