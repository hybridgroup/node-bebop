

"use strict";

var commandToBuffer = require("./commandToBuffer");

var WifiSettings = module.exports = function(self) {
  this.self = self;
};

WifiSettings.prototype.outdoorSetting = function(outdoor) {

  var buffer = commandToBuffer(0, "WifiSettings", "OutdoorSetting", outdoor);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
