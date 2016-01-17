

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Audio = module.exports = function(self) {
  this.self = self;
};

Audio.prototype.controllerReadyForStreaming = function(ready) {

  var buffer = commandToBuffer(1, "Audio", "controllerReadyForStreaming", ready);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
