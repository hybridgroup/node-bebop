

"use strict";

var commandToBuffer = require("./commandToBuffer");

var ChargerState = module.exports = function(self) {
  this.self = self;
};

ChargerState.prototype.chargingInfo = function(obj) {

  var buffer = commandToBuffer(0, "ChargerState", "ChargingInfo", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
