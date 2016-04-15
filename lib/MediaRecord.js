

"use strict";

var commandToBuffer = require("./commandToBuffer");

var MediaRecord = module.exports = function(self) {
  this.self = self;
};

MediaRecord.prototype.picture = function(massStorageId) {

  var buffer = commandToBuffer(1, "MediaRecord", "Picture", massStorageId);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.video = function(val) {

  var buffer = commandToBuffer(1, "MediaRecord", "Video", val);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.pictureV2 = function() {

  var buffer = commandToBuffer(1, "MediaRecord", "PictureV2");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.videoV2 = function(record) {

  var buffer = commandToBuffer(1, "MediaRecord", "VideoV2", record);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
