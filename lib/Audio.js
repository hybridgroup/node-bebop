

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Audio = module.exports = function(self) {
  this.self = self;
};

Audio.prototype.ControllerReadyForStreaming = function(ready) {

  var buffer = commandToBuffer(1, "Audio", "ControllerReadyForStreaming", ready);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
