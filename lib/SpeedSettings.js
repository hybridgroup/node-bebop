

"use strict";

var commandToBuffer = require("./commandToBuffer");

var SpeedSettings = module.exports = function(self) {
  this.self = self;
};

SpeedSettings.prototype.maxVerticalSpeed = function(current) {

  var buffer = commandToBuffer(1, "SpeedSettings", "MaxVerticalSpeed", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.maxRotationSpeed = function(current) {

  var buffer = commandToBuffer(1, "SpeedSettings", "MaxRotationSpeed", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.hullProtection = function(present) {

  var buffer = commandToBuffer(1, "SpeedSettings", "HullProtection", present);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.outdoor = function(outdoor) {

  var buffer = commandToBuffer(1, "SpeedSettings", "Outdoor", outdoor);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
