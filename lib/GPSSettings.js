

"use strict";

var commandToBuffer = require("./commandToBuffer");

var GPSSettings = module.exports = function(self) {
  this.self = self;
};

GPSSettings.prototype.setHome = function(obj) {

  var buffer = commandToBuffer(1, "GPSSettings", "SetHome", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.resetHome = function() {

  var buffer = commandToBuffer(1, "GPSSettings", "ResetHome");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.sendControllerGPS = function(obj) {

  var buffer = commandToBuffer(1, "GPSSettings", "SendControllerGPS", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.homeType = function(type) {

  var buffer = commandToBuffer(1, "GPSSettings", "HomeType", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.returnHomeDelay = function(delay) {

  var buffer = commandToBuffer(1, "GPSSettings", "ReturnHomeDelay", delay);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
