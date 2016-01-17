

"use strict";

var commandToBuffer = require("./commandToBuffer");

var NetworkSettings = module.exports = function(self) {
  this.self = self;
};

NetworkSettings.prototype.wifiSelection = function(obj) {

  var buffer = commandToBuffer(0, "NetworkSettings", "wifiSelection", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};