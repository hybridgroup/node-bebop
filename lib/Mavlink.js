

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Mavlink = module.exports = function(self) {
  this.self = self;
};

Mavlink.prototype.Start = function(obj) {

  var buffer = commandToBuffer(1, "Mavlink", "Start", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Mavlink.prototype.Pause = function() {

  var buffer = commandToBuffer(1, "Mavlink", "Pause");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Mavlink.prototype.Stop = function() {

  var buffer = commandToBuffer(1, "Mavlink", "Stop");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
