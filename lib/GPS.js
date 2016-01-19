

"use strict";

var commandToBuffer = require("./commandToBuffer");

var GPS = module.exports = function(self) {
  this.self = self;
};

GPS.prototype.controllerPositionForRun = function(obj) {

  var buffer = commandToBuffer(0, "GPS", "ControllerPositionForRun", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
