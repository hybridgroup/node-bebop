

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PilotingEvent = module.exports = function(self) {
  this.self = self;
};

PilotingEvent.prototype.moveByEnd = function(obj) {

  var buffer = commandToBuffer(1, "PilotingEvent", "moveByEnd", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
