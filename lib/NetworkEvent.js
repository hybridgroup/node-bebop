

"use strict";

var commandToBuffer = require("./commandToBuffer");

var NetworkEvent = module.exports = function(self) {
  this.self = self;
};

NetworkEvent.prototype.disconnection = function(cause) {

  var buffer = commandToBuffer(0, "NetworkEvent", "Disconnection", cause);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
