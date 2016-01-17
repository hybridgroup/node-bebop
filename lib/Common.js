

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Common = module.exports = function(self) {
  this.self = self;
};

Common.prototype.allStates = function() {

  var buffer = commandToBuffer(1, "Common", "AllStates");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.currentDate = function(date) {

  var buffer = commandToBuffer(1, "Common", "CurrentDate", date);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.currentTime = function(time) {

  var buffer = commandToBuffer(1, "Common", "CurrentTime", time);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.reboot = function() {

  var buffer = commandToBuffer(1, "Common", "Reboot");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
