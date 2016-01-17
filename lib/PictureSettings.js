

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PictureSettings = module.exports = function(self) {
  this.self = self;
};

PictureSettings.prototype.pictureFormatSelection = function(type) {

  var buffer = commandToBuffer(0, "PictureSettings", "pictureFormatSelection", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.autoWhiteBalanceSelection = function(type) {

  var buffer = commandToBuffer(0, "PictureSettings", "autoWhiteBalanceSelection", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.expositionSelection = function(value) {

  var buffer = commandToBuffer(0, "PictureSettings", "expositionSelection", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.saturationSelection = function(value) {

  var buffer = commandToBuffer(0, "PictureSettings", "saturationSelection", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.timelapseSelection = function(obj) {

  var buffer = commandToBuffer(0, "PictureSettings", "timelapseSelection", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.videoAutorecordSelection = function(obj) {

  var buffer = commandToBuffer(0, "PictureSettings", "videoAutorecordSelection", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};