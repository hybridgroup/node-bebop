

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Common = module.exports = function(self) {
  this.self = self;
};

Common.prototype.allStates = function() {

  var buffer = commandToBuffer(0, "Common", "AllStates");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.currentDate = function(date) {
  var val = date + "\u0000";
  var buffer = commandToBuffer(0, "Common", "CurrentDate", val);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.currentTime = function(time) {
  var val = time + "\u0000";
  var buffer = commandToBuffer(0, "Common", "CurrentTime", val);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Common.prototype.reboot = function() {

  var buffer = commandToBuffer(0, "Common", "Reboot");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
