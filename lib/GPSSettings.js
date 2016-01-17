

"use strict";

var commandToBuffer = require("./commandToBuffer");

var GPSSettings = module.exports = function(self) {
  this.self = self;
};

GPSSettings.prototype.SetHome = function(obj) {

  var buffer = commandToBuffer(0, "GPSSettings", "SetHome", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.ResetHome = function() {

  var buffer = commandToBuffer(0, "GPSSettings", "ResetHome");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.SendControllerGPS = function(obj) {

  var buffer = commandToBuffer(0, "GPSSettings", "SendControllerGPS", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.HomeType = function(type) {

  var buffer = commandToBuffer(0, "GPSSettings", "HomeType", type);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

GPSSettings.prototype.ReturnHomeDelay = function(delay) {

  var buffer = commandToBuffer(0, "GPSSettings", "ReturnHomeDelay", delay);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
