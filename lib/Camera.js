

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Camera = module.exports = function(self) {
  this.self = self;
};

Camera.prototype.Orientation = function(obj) {

  var buffer = commandToBuffer(0, "Camera", "Orientation", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
