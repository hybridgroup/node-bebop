"use strict";

var types = require("./types");
var commands = require("./commands.json");

var parseCommand = function() {

  var command = commands;
  var args = [];
  var parent;

  Array.prototype.slice.call(arguments, 0).forEach(function(node, index) {

    parent = command.class ||
             command.cmd ||
             command;

    parent = [].concat(parent);


    command = parent.first({id: node}) ||
              parent.first({name: node}) ||
              parent;

    switch (index) {
      case 0:
      case 1:
        args.push({value: command.id, type: "u8"});
      break;
      case 2:
        args.push({value: parent.indexOf(command), type: "u16"});
      break;
      case 3:
        if (command.first().arg) {
          [].concat(command.first().arg).forEach(function(arg) {
            args.push({value: node[arg.name], type: arg.type});
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
    length += types[part.type].length;
  });

  var buffer = new Buffer(length);

  command.forEach(function(part) {

    types[part.type].write(buffer, parseInt(part.value, 10), offset);
    offset += types[part.type].length;

  });

  return buffer;
};

module.exports = function() {
  return writeBuffer(parseCommand.apply(null, arguments));
};

