"use strict";

var types = require("./types");
var commands = require("./commands.json");

var partLength = function(part) {
  if (part.type === "string") {
    return part.value.length;
  }
  return types[part.type].length;
};

/*
  parseCommand is called as part of the process of converting a command list,
  to a buffer ready to send to the drone.

  For example:

    var cmdList = parseCommand(0, "Mavlink", "Stop");

  The first param corresponds to the kind of params expected.

  cmdList is an array returned of parsed command objects.

  parseCommand matches passed in params against the JSON data in the
  commands.json file to construct the needed drone message buffer

  format of the config.json is as follows:

  An array of "class" objects:
  [
    {
      "id": "1",
      "class": [
        {...}
      ]
    }
  ]

  Here is the "Piloting" "class" object. It contains one or more "cmd" objects:
  {
    "name": "Piloting",
    "id": "0",
    "cmd": [
      {
        "name": "TakeOff",
        "$t": "Ask the drone to take off"
      },
      {...}
  }

  Each "cmd" object describes a single command. Here is "TakeOff", which has
  no params (aka args):
  {
    "name": "TakeOff",
    "$t": "Ask the drone to take off"
  }

  Here is the "NavigateHome" command, which takes an arg which is
  an integer with either 1 or 0:
  {
    "name": "NavigateHome",
    "arg": {
      "name": "start",
      "type": "u8",
      "$t": "1 to start the navigate home, 0 to stop it"
    }
  }

  Here is the "PCMD" command, which takes an arg of an array of params:
  {
    "name": "PCMD",
    "buffer": "NON_ACK",
    "arg": [
      {
        "name": "flag",
        "type": "u8",
        "$t": "Boolean flag to activate roll/pitch movement"
      },
      {
        "name": "roll",
        "type": "i8",
        "$t": "Roll consign for the drone [-100;100]"
      },
      {
        "name": "pitch",
        "type": "i8",
        "$t": "Pitch consign for the drone [-100;100]"
      },
      {
        "name": "yaw",
        "type": "i8",
        "$t": "Yaw consign for the drone [-100;100]"
      },
      {
        "name": "gaz",
        "type": "i8",
        "$t": "Gaz consign for the drone [-100;100]"
      },
      {
        "name": "timestampAndSeqNum",
        "type": "u32",
        "$t": "Command timestamp in milliseconds &#40;low 24 bits&#41; + command sequence number [0;255] &#40;high 8 bits&#41;."
      }
    ]
  }

  When arg is an array, each "param" has a "name", a "type", and "$t" informational string:
  {
    "name": "flag",
    "type": "u8",
    "$t": "Boolean flag to activate roll/pitch movement"
  }

*/

var parseCommand = function() {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }

  var commandTypeId = args[0];
  var commandClassName = args[1];
  var commandName = args[2];

  var returnArgs = [];

  // e.g. "1"
  var commandType = commands.first({id: commandTypeId});
  returnArgs.push({value: commandTypeId, type: "u8"});

  // e.g. "Piloting"
  var commandClass = commandType.class.first({name: commandClassName});
  returnArgs.push({value: commandClass.id, type: "u8"});

  // e.g. "TakeOff"
  var commandsAry = [].concat(commandClass.cmd);
  var command = commandsAry.first({name: commandName});
  command.id = commandsAry.indexOf(command);
  returnArgs.push({value: command.id, type: "u16"});

  // now handle all the rest of the passed in arguments, mapping
  // them to the expected args for this command
  var offset = 3;
  if (command.arg && args.length > 3) {
    [].concat(command.arg).forEach(function(arg) {
      returnArgs.push({value: args[offset], type: arg.type});
      offset++;
    });
  }

  return returnArgs;
};

var writeBuffer = function(command) {
  var length = 0;
  var offset = 0;

  command.forEach(function(part) {
    length += partLength(part);
  });

  var buffer = new Buffer(length);

  command.forEach(function(part) {
    types[part.type].write(buffer, part.value, offset);
    offset += partLength(part);
  });

  return buffer;
};

/*
  commandToBuffer converts a list of command,
  to a buffer ready to send to the drone.

  For example:
    var commandsList = parseCommand(0, "Mavlink", "Stop");
*/
module.exports = function() {
  return writeBuffer(parseCommand.apply(null, arguments));
};
