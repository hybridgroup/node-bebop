

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Headlights = module.exports = function(self) {
  this.self = self;
};

Headlights.prototype.intensity = function(obj) {

  var buffer = commandToBuffer(0, "Headlights", "intensity", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
