

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Calibration = module.exports = function(self) {
  this.self = self;
};

Calibration.prototype.MagnetoCalibration = function(calibrate) {

  var buffer = commandToBuffer(1, "Calibration", "MagnetoCalibration", calibrate);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
