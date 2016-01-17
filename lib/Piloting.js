

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Piloting = module.exports = function(self) {
  this.self = self;
};

Piloting.prototype.flatTrim = function() {

  var buffer = commandToBuffer(0, "Piloting", "flatTrim");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.takeOff = function() {

  var buffer = commandToBuffer(0, "Piloting", "takeOff");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.pcmd = function(obj) {

  var buffer = commandToBuffer(0, "Piloting", "pcmd", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.landing = function() {

  var buffer = commandToBuffer(0, "Piloting", "landing");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.emergency = function() {

  var buffer = commandToBuffer(0, "Piloting", "emergency");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.navigateHome = function(start) {

  var buffer = commandToBuffer(0, "Piloting", "navigateHome", start);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.autoTakeOffMode = function(state) {

  var buffer = commandToBuffer(0, "Piloting", "autoTakeOffMode", state);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Piloting.prototype.moveBy = function(obj) {

  var buffer = commandToBuffer(0, "Piloting", "moveBy", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
