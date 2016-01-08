"use strict";

var types = require("./types");
var commands = require("./commands");

var parseCommand = function() {

  var command = commands;
  var args = [];
  var parent;

  Array.prototype.slice.call(arguments, 0).forEach(function(node, index) {

    parent = command.class ||
             command.cmd ||
             command;

    parent = [].concat(parent);

    command = parent.first({_id: node}) ||
              parent.first({_name: node}) ||
              parent;

    switch (index) {
      case 0:
      case 1:
        args.push({_value: command._id, _type: "u8"});
      break;
      case 2:
        args.push({_value: parent.indexOf(command), _type: "u16"});
      break;
      case 3:
        if (command.first().arg) {
          [].concat(command.first().arg).forEach(function(arg) {
            args.push({_value: node[arg._name], _type: arg._type});
          });
        }
      break;
    }
  });

  return args;
};

var writeBuffer = function(command) {

  var length = 0;
  var offset = 0;

  command.forEach(function(part) {
    length += types[part._type].length;
  });

  var buffer = new Buffer(length);

  command.forEach(function(part) {

    types[part._type].write(buffer, parseInt(part._value, 10), offset);
    offset += types[part._type].length;

  });

  return buffer;
};

module.exports = function() {
  return writeBuffer(parseCommand.apply(null, arguments));
};
