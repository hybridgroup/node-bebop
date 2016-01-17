

"use strict";

var commandToBuffer = require("./commandToBuffer");

var Animations = module.exports = function(self) {
  this.self = self;
};

Animations.prototype.StartAnimation = function(anim) {

  var buffer = commandToBuffer(1, "Animations", "StartAnimation", anim);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Animations.prototype.StopAnimation = function(anim) {

  var buffer = commandToBuffer(1, "Animations", "StopAnimation", anim);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

Animations.prototype.StopAllAnimations = function() {

  var buffer = commandToBuffer(1, "Animations", "StopAllAnimations");

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
