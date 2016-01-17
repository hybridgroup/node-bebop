

"use strict";

var commandToBuffer = require("./commandToBuffer");

var SpeedSettings = module.exports = function(self) {
  this.self = self;
};

SpeedSettings.prototype.maxVerticalSpeed = function(current) {

  var buffer = commandToBuffer(0, "SpeedSettings", "maxVerticalSpeed", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.maxRotationSpeed = function(current) {

  var buffer = commandToBuffer(0, "SpeedSettings", "maxRotationSpeed", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.hullProtection = function(present) {

  var buffer = commandToBuffer(0, "SpeedSettings", "hullProtection", present);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.outdoor = function(outdoor) {

  var buffer = commandToBuffer(0, "SpeedSettings", "outdoor", outdoor);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
