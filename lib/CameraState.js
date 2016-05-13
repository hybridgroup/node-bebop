

"use strict";

var commandToBuffer = require("./commandToBuffer");

var CameraState = module.exports = function(self) {
  this.self = self;
};

CameraState.prototype.orientation = function(tilt, pan) {

  var buffer = commandToBuffer(1, "CameraState", "Orientation", tilt, pan);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

CameraState.prototype.defaultCameraOrientation = function(tilt, pan) {

  var buffer = commandToBuffer(1, "CameraState", "defaultCameraOrientation", tilt, pan);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
