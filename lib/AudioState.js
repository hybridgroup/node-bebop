

"use strict";

var commandToBuffer = require("./commandToBuffer");

var AudioState = module.exports = function(self) {
  this.self = self;
};

AudioState.prototype.audioStreamingRunning = function(running) {

  var buffer = commandToBuffer(0, "AudioState", "AudioStreamingRunning", running);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
