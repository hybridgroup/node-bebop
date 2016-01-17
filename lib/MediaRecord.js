

"use strict";

var commandToBuffer = require("./commandToBuffer");

var MediaRecord = module.exports = function(self) {
  this.self = self;
};

MediaRecord.prototype.Picture = function(mass_storage_id) {

  var buffer = commandToBuffer(0, "MediaRecord", "Picture", mass_storage_id);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.Video = function(obj) {

  var buffer = commandToBuffer(0, "MediaRecord", "Video", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.PictureV2 = function() {

  var buffer = commandToBuffer(0, "MediaRecord", "PictureV2");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.VideoV2 = function(record) {

  var buffer = commandToBuffer(0, "MediaRecord", "VideoV2", record);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
