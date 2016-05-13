

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Audio = module.exports = function(self) {
  this.self = self;
};

Audio.prototype.controllerReadyForStreaming = function(ready) {

  var buffer = commandToBuffer(0, "Audio", "ControllerReadyForStreaming", ready);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
