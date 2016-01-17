

"use strict";

var commandToBuffer = require("./commandToBuffer");

var OverHeat = module.exports = function(self) {
  this.self = self;
};

OverHeat.prototype.switchOff = function() {

  var buffer = commandToBuffer(1, "OverHeat", "switchOff");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

OverHeat.prototype.ventilate = function() {

  var buffer = commandToBuffer(1, "OverHeat", "ventilate");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
