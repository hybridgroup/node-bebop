

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PROState = module.exports = function(self) {
  this.self = self;
};

PROState.prototype.features = function(features) {

  var buffer = commandToBuffer(1, "PROState", "Features", features);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
