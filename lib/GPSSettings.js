

"use strict";

var commandToBuffer = require("./commandToBuffer");

var GPSSettings = module.exports = function(self) {
  this.self = self;
};

GPSSettings.prototype.setHome = function(obj) {

  var buffer = commandToBuffer(0, "GPSSettings", "setHome", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.resetHome = function() {

  var buffer = commandToBuffer(0, "GPSSettings", "resetHome");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.sendControllerGPS = function(obj) {

  var buffer = commandToBuffer(0, "GPSSettings", "sendControllerGPS", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.homeType = function(type) {

  var buffer = commandToBuffer(0, "GPSSettings", "homeType", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.returnHomeDelay = function(delay) {

  var buffer = commandToBuffer(0, "GPSSettings", "returnHomeDelay", delay);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
