

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Network = module.exports = function(self) {
  this.self = self;
};

Network.prototype.disconnect = function() {

  var buffer = commandToBuffer(1, "Network", "disconnect");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
f;
};

Network.prototype.wifiAuthChannel = function() {

  var buffer = commandToBuffer(0, "Network", "wifiAuthChannel");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
