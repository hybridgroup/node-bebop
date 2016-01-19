

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Animations = module.exports = function(self) {
  this.self = self;
};

Animations.prototype.startAnimation = function(anim) {

  var buffer = commandToBuffer(0, "Animations", "StartAnimation", anim);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Animations.prototype.stopAnimation = function(anim) {

  var buffer = commandToBuffer(0, "Animations", "StopAnimation", anim);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Animations.prototype.stopAllAnimations = function() {

  var buffer = commandToBuffer(0, "Animations", "StopAllAnimations");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
