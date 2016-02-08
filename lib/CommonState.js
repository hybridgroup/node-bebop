

"use strict";

var commandToBuffer = require("./commandToBuffer");

var CommonState = module.exports = function(self) {
  this.self = self;
};

CommonState.prototype.productModel = function(model) {

  var buffer = commandToBuffer(0, "CommonState", "ProductModel", model);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};

CommonState.prototype.countryListKnown = function(obj) {

  var buffer = commandToBuffer(0, "CommonState", "CountryListKnown", obj);

  this.self._writePacket(this.self._networkFrameGenerator(buffer));
  return this.self;
};
