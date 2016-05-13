

"use strict";

var commandToBuffer = require("./commandToBuffer");

var ARLibsVersionsState = module.exports = function(self) {
  this.self = self;
};

ARLibsVersionsState.prototype.controllerLibARCommandsVersion = function(version) {

  var buffer = commandToBuffer(0, "ARLibsVersionsState", "ControllerLibARCommandsVersion", version);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

ARLibsVersionsState.prototype.skyControllerLibARCommandsVersion = function(version) {

  var buffer = commandToBuffer(0, "ARLibsVersionsState", "SkyControllerLibARCommandsVersion", version);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

ARLibsVersionsState.prototype.deviceLibARCommandsVersion = function(version) {

  var buffer = commandToBuffer(0, "ARLibsVersionsState", "DeviceLibARCommandsVersion", version);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
