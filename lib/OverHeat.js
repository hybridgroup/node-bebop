

"use strict";

var commandToBuffer = require("./commandToBuffer");

var OverHeat = module.exports = function(self) {
  this.self = self;
};

OverHeat.prototype.switchOff = function() {

  var buffer = commandToBuffer(1, "OverHeat", "SwitchOff");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

OverHeat.prototype.ventilate = function() {

  var buffer = commandToBuffer(1, "OverHeat", "Ventilate");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
