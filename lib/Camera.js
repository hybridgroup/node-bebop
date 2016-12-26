

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Camera = module.exports = function(self) {
  this.self = self;
};

Camera.prototype.orientation = function(tilt, pan) {
  var buffer = commandToBuffer(1, "Camera", "Orientation", tilt, pan);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Camera.prototype.orientationv2 = function(tilt, pan) {
  var buffer = commandToBuffer(1, "Camera", "OrientationV2", tilt, pan);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Camera.prototype.velocity = function(tilt, pan) {
  var buffer = commandToBuffer(1, "Camera", "Velocity", tilt, pan);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
