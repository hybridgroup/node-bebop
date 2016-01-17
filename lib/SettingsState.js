

"use strict";

var commandToBuffer = require("./commandToBuffer");

var SettingsState = module.exports = function(self) {
  this.self = self;
};

SettingsState.prototype.P7ID = function(serialID) {

  var buffer = commandToBuffer(0, "SettingsState", "P7ID", serialID);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
