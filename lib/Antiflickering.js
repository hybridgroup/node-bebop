

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Antiflickering = module.exports = function(self) {
  this.self = self;
};

Antiflickering.prototype.electricFrequency = function(frequency) {

  var buffer = commandToBuffer(1, "Antiflickering", "electricFrequency", frequency);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Antiflickering.prototype.setMode = function(mode) {

  var buffer = commandToBuffer(1, "Antiflickering", "setMode", mode);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
