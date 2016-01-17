

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Animations = module.exports = function(self) {
  this.self = self;
};

Animations.prototype.startAnimation = function(anim) {

  var buffer = commandToBuffer(1, "Animations", "startAnimation", anim);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Animations.prototype.stopAnimation = function(anim) {

  var buffer = commandToBuffer(1, "Animations", "stopAnimation", anim);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Animations.prototype.stopAllAnimations = function() {

  var buffer = commandToBuffer(1, "Animations", "stopAllAnimations");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
