

"use strict";

var commandToBuffer = require("./commandToBuffer");

var SpeedSettings = module.exports = function(self) {
  this.self = self;
};

SpeedSettings.prototype.MaxVerticalSpeed = function(current) {

  var buffer = commandToBuffer(0, "SpeedSettings", "MaxVerticalSpeed", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.MaxRotationSpeed = function(current) {

  var buffer = commandToBuffer(0, "SpeedSettings", "MaxRotationSpeed", current);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.HullProtection = function(present) {

  var buffer = commandToBuffer(0, "SpeedSettings", "HullProtection", present);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

SpeedSettings.prototype.Outdoor = function(outdoor) {

  var buffer = commandToBuffer(0, "SpeedSettings", "Outdoor", outdoor);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
