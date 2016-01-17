

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Common = module.exports = function(self) {
  this.self = self;
};

Common.prototype.AllStates = function() {

  var buffer = commandToBuffer(1, "Common", "AllStates");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.CurrentDate = function(date) {

  var buffer = commandToBuffer(1, "Common", "CurrentDate", date);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.CurrentTime = function(time) {

  var buffer = commandToBuffer(1, "Common", "CurrentTime", time);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.Reboot = function() {

  var buffer = commandToBuffer(1, "Common", "Reboot");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
