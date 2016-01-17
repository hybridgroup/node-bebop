

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Settings = module.exports = function(self) {
  this.self = self;
};

Settings.prototype.allSettings = function() {

  var buffer = commandToBuffer(1, "Settings", "allSettings");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.reset = function() {

  var buffer = commandToBuffer(1, "Settings", "reset");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.productName = function(name) {

  var buffer = commandToBuffer(1, "Settings", "productName", name);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.country = function(code) {

  var buffer = commandToBuffer(1, "Settings", "country", code);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.autoCountry = function(automatic) {

  var buffer = commandToBuffer(1, "Settings", "autoCountry", automatic);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
