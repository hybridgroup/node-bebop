

"use strict";

var commandToBuffer = require("./commandToBuffer");

var FlightPlanEvent = module.exports = function(self) {
  this.self = self;
};

FlightPlanEvent.prototype.startingErrorEvent = function() {

  var buffer = commandToBuffer(1, "FlightPlanEvent", "StartingErrorEvent");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

FlightPlanEvent.prototype.speedBridleEvent = function() {

  var buffer = commandToBuffer(1, "FlightPlanEvent", "SpeedBridleEvent");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
