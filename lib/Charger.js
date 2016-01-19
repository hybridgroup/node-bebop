

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Charger = module.exports = function(self) {
  this.self = self;
};

Charger.prototype.setMaxChargeRate = function(rate) {

  var buffer = commandToBuffer(0, "Charger", "SetMaxChargeRate", rate);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
