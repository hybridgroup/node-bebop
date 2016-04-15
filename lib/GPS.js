

"use strict";

var commandToBuffer = require("./commandToBuffer");

var GPS = module.exports = function(self) {
  this.self = self;
};

GPS.prototype.controllerPositionForRun = function(latitude, longitude) {

  var buffer = commandToBuffer(0, "GPS", "ControllerPositionForRun", latitude, longitude);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
