"use strict";

var Bebop = require("./bebop");

module.exports.constants = require("./constants");

module.exports.createClient = function(opts) {
  return new Bebop(opts);
};
