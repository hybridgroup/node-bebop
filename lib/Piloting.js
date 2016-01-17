

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Piloting = module.exports = function(self) {
  this.self = self;
};

Piloting.prototype.FlatTrim = function() {

  var buffer = commandToBuffer(0, "Piloting", "FlatTrim");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.TakeOff = function() {

  var buffer = commandToBuffer(0, "Piloting", "TakeOff");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.PCMD = function(obj) {

  var buffer = commandToBuffer(0, "Piloting", "PCMD", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.Landing = function() {

  var buffer = commandToBuffer(0, "Piloting", "Landing");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.Emergency = function() {

  var buffer = commandToBuffer(0, "Piloting", "Emergency");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.NavigateHome = function(start) {

  var buffer = commandToBuffer(0, "Piloting", "NavigateHome", start);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.AutoTakeOffMode = function(state) {

  var buffer = commandToBuffer(0, "Piloting", "AutoTakeOffMode", state);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.moveBy = function(obj) {

  var buffer = commandToBuffer(0, "Piloting", "moveBy", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
