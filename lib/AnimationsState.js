

"use strict";

var commandToBuffer = require("./commandToBuffer");

var AnimationsState = module.exports = function(self) {
  this.self = self;
};

AnimationsState.prototype.list = function(obj) {

  var buffer = commandToBuffer(0, "AnimationsState", "List", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
