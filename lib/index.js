"use strict";

var bebop = require('./bebop');

module.exports.constants = require('./constants');

module.exports.createClient = function(opts) {
  return new bebop(opts);
}
