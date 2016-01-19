

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

Piloting.prototype.pcmd = function(obj) {

  var buffer = commandToBuffer(1, "Piloting", "PCMD", obj);

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

Piloting.prototype.moveBy = function(obj) {

  var buffer = commandToBuffer(1, "Piloting", "moveBy", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
