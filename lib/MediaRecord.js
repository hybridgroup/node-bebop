

"use strict";

var commandToBuffer = require("./commandToBuffer");

var MediaRecord = module.exports = function(self) {
  this.self = self;
};

MediaRecord.prototype.picture = function(mass_storage_id) {

  var buffer = commandToBuffer(0, "MediaRecord", "picture", mass_storage_id);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.video = function(obj) {

  var buffer = commandToBuffer(0, "MediaRecord", "video", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.pictureV2 = function() {

  var buffer = commandToBuffer(0, "MediaRecord", "pictureV2");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

MediaRecord.prototype.videoV2 = function(record) {

  var buffer = commandToBuffer(0, "MediaRecord", "videoV2", record);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
