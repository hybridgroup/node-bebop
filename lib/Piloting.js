

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Piloting = module.exports = function(self) {
  this.self = self;
};

Piloting.prototype.flatTrim = function() {

  var buffer = commandToBuffer(1, "Piloting", "FlatTrim");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.takeOff = function() {

  var buffer = commandToBuffer(1, "Piloting", "TakeOff");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.pcmd = function(flag, roll, pitch, yaw, gaz,
                                   timestampAndSeqNum) {

  var buffer = commandToBuffer(1, "Piloting", "PCMD",
                               flag, roll, pitch, yaw, gaz, timestampAndSeqNum);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.landing = function() {

  var buffer = commandToBuffer(1, "Piloting", "Landing");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.emergency = function() {

  var buffer = commandToBuffer(1, "Piloting", "Emergency");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.navigateHome = function(start) {

  var buffer = commandToBuffer(1, "Piloting", "NavigateHome", start);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.autoTakeOffMode = function(state) {

  var buffer = commandToBuffer(1, "Piloting", "AutoTakeOffMode", state);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.moveBy = function(dX, dY, dZ, dPsi) {

  var buffer = commandToBuffer(1, "Piloting", "moveBy", dX, dY, dZ, dPsi);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.userTakeOff = function(state) {

  var buffer = commandToBuffer(1, "Piloting", "UserTakeOff", state);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.circle = function(direction) {

  var buffer = commandToBuffer(1, "Piloting", "Circle", direction);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
