

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Accessory = module.exports = function(self) {
  this.self = self;
};

Accessory.prototype.config = function(accessory) {

  var buffer = commandToBuffer(1, "Accessory", "config", accessory);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
