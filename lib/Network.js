

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Network = module.exports = function(self) {
  this.self = self;
};

Network.prototype.disconnect = function() {

  var buffer = commandToBuffer(0, "Network", "Disconnect");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Network.prototype.wifiAuthChannel = function() {

  var buffer = commandToBuffer(1, "Network", "WifiAuthChannel");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
