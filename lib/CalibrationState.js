

"use strict";

var commandToBuffer = require("./commandToBuffer");

var CalibrationState = module.exports = function(self) {
  this.self = self;
};

CalibrationState.prototype.magnetoCalibrationRequiredState = function(required) {

  var buffer = commandToBuffer(0, "CalibrationState", "MagnetoCalibrationRequiredState", required);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
