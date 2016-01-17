

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PilotingSettingsState = module.exports = function(self) {
  this.self = self;
};

PilotingSettingsState.prototype.autonomousFlightMaxHorizontalSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettingsState", "AutonomousFlightMaxHorizontalSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettingsState.prototype.autonomousFlightMaxVerticalSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettingsState", "AutonomousFlightMaxVerticalSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettingsState.prototype.autonomousFlightMaxHorizontalAcceleration = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettingsState", "AutonomousFlightMaxHorizontalAcceleration", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettingsState.prototype.autonomousFlightMaxVerticalAcceleration = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettingsState", "AutonomousFlightMaxVerticalAcceleration", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PilotingSettingsState.prototype.autonomousFlightMaxRotationSpeed = function(value) {

  var buffer = commandToBuffer(0, "PilotingSettingsState", "AutonomousFlightMaxRotationSpeed", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
