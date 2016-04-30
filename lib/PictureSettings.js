

"use strict";

var commandToBuffer = require("./commandToBuffer");

var PictureSettings = module.exports = function(self) {
  this.self = self;
};

PictureSettings.prototype.pictureFormatSelection = function(type) {

  var buffer = commandToBuffer(1, "PictureSettings", "PictureFormatSelection", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.autoWhiteBalanceSelection = function(type) {

  var buffer = commandToBuffer(1, "PictureSettings", "AutoWhiteBalanceSelection", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.expositionSelection = function(value) {

  var buffer = commandToBuffer(1, "PictureSettings", "ExpositionSelection", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.saturationSelection = function(value) {

  var buffer = commandToBuffer(1, "PictureSettings", "SaturationSelection", value);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.timelapseSelection = function(enabled, interval) {

  var buffer = commandToBuffer(1, "PictureSettings", "TimelapseSelection",
                               enabled, interval);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.videoAutorecordSelection = function(enabled,
                                                              massStorageId) {

  var buffer = commandToBuffer(1, "PictureSettings", "VideoAutorecordSelection",
                               enabled, massStorageId);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

PictureSettings.prototype.videoStabilizationMode = function(mode) {

  var buffer = commandToBuffer(1, "PictureSettings", "VideoStabilizationMode",
                               mode);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
