

"use strict";

var commandToBuffer = require("./commandToBuffer");

var CameraState = module.exports = function(self) {
  this.self = self;
};

CameraState.prototype.orientation = function(obj) {

  var buffer = commandToBuffer(0, "CameraState", "Orientation", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

CameraState.prototype.defaultCameraOrientation = function(obj) {

  var buffer = commandToBuffer(0, "CameraState", "defaultCameraOrientation", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
