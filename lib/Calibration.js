

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Calibration = module.exports = function(self) {
  this.self = self;
};

Calibration.prototype.magnetoCalibration = function(calibrate) {

  var buffer = commandToBuffer(0, "Calibration", "MagnetoCalibration", calibrate);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
