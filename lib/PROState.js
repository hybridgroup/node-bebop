

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PROState = module.exports = function(self) {
  this.self = self;
};

PROState.prototype.Features = function(features) {

  var buffer = commandToBuffer(0, "PROState", "Features", features);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
