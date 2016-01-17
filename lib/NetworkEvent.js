

"use strict";

var commandToBuffer = require("./commandToBuffer");

var NetworkEvent = module.exports = function(self) {
  this.self = self;
};

NetworkEvent.prototype.Disconnection = function(cause) {

  var buffer = commandToBuffer(1, "NetworkEvent", "Disconnection", cause);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
