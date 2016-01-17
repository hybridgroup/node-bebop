

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PictureSettings = module.exports = function(self) {
  this.self = self;
};

PictureSettings.prototype.pictureFormatSelection = function(type) {

  var buffer = commandToBuffer(0, "PictureSettings", "PictureFormatSelection", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.autoWhiteBalanceSelection = function(type) {

  var buffer = commandToBuffer(0, "PictureSettings", "AutoWhiteBalanceSelection", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.expositionSelection = function(value) {

  var buffer = commandToBuffer(0, "PictureSettings", "ExpositionSelection", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.saturationSelection = function(value) {

  var buffer = commandToBuffer(0, "PictureSettings", "SaturationSelection", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.timelapseSelection = function(obj) {

  var buffer = commandToBuffer(0, "PictureSettings", "TimelapseSelection", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.videoAutorecordSelection = function(obj) {

  var buffer = commandToBuffer(0, "PictureSettings", "VideoAutorecordSelection", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
