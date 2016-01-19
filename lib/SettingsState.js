

"use strict";

var commandToBuffer = require("./commandToBuffer");

var SettingsState = module.exports = function(self) {
  this.self = self;
};

SettingsState.prototype.p7id = function(serialID) {

  var buffer = commandToBuffer(1, "SettingsState", "P7ID", serialID);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
