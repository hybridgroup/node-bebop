

"use strict";

var commandToBuffer = require("./commandToBuffer");

var MediaStreaming = module.exports = function(self) {
  this.self = self;
};

MediaStreaming.prototype.videoEnable = function(enable) {

  var buffer = commandToBuffer(1, "MediaStreaming", "VideoEnable", enable);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaStreaming.prototype.videoStreamMode = function(mode) {
  var buffer = commandToBuffer(1, "MediaStreaming", "VideoStreamMode", mode);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
