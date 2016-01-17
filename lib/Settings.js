

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Settings = module.exports = function(self) {
  this.self = self;
};

Settings.prototype.AllSettings = function() {

  var buffer = commandToBuffer(1, "Settings", "AllSettings");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.Reset = function() {

  var buffer = commandToBuffer(1, "Settings", "Reset");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.ProductName = function(name) {

  var buffer = commandToBuffer(1, "Settings", "ProductName", name);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.Country = function(code) {

  var buffer = commandToBuffer(1, "Settings", "Country", code);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Settings.prototype.AutoCountry = function(automatic) {

  var buffer = commandToBuffer(1, "Settings", "AutoCountry", automatic);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
