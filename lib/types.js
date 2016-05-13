"use strict";

module.exports = {
  "u8": {
    read: function(buffer, index) {
      return buffer.readUInt8(index);
    },
    write: function(buffer, value, index) {
      var data = parseInt(value, 10);
      buffer.writeUInt8(data, index);
      return buffer;
    },
    length: 1
  },
  "i8": {
    read: function(buffer, index) {
      return buffer.readInt8(index);
    },
    write: function(buffer, value, index) {
      var data = parseInt(value, 10);
      buffer.writeInt8(data, index);
      return buffer;
    },
    length: 1
  },
  "u16": {
    read: function(buffer, index) {
      return buffer.readUInt16LE(index);
    },
    write: function(buffer, value, index) {
      var data = parseInt(value, 10);
      buffer.writeUInt16LE(data, index);
      return buffer;
    },
    length: 2
  },
  "i16": {
    read: function(buffer, index) {
      return buffer.readInt16LE(index);
    },
    write: function(buffer, value, index) {
      var data = parseInt(value, 10);
      buffer.writeInt16LE(data, index);
      return buffer;
    },
    length: 2
  },
  "u32": {
    read: function(buffer, index) {
      return buffer.readInt32LE(index);
    },
    write: function(buffer, value, index) {
      var data = parseInt(value, 10);
      buffer.writeInt32LE(data, index);
      return buffer;
    },
    length: 4
  },
  "float": {
    read: function(buffer, index) {
      return buffer.readFloatLE(index);
    },
    write: function(buffer, data, index) {
      buffer.writeFloatLE(data, index);
      return buffer;
    },
    length: 4
  },
  "double": {
    read: function(buffer, index) {
      return buffer.readDoubleLE(index);
    },
    write: function(buffer, data, index) {
      buffer.writeDoubleLE(data, index);
      return buffer;
    },
    length: 8
  },
  "string": {
    read: function(buffer, index) {
      return String.fromCharCode
        .apply(null, Array.prototype.slice.call(buffer, index));
    },
    write: function(buffer, data, index) {
      // TODO: check if we need to encode a particular way
      buffer.write(data, index);
      return buffer;
    },
    length: 24
  },
  "enum": {
    read: function(buffer, index, arg) {
      var value, name, len;
      len = buffer.length - index;
      if (len < 4) {
        name = "invalid enum";
      } else {
        value = buffer.readInt32LE(index);
        if (!arg.enum || !arg.enum[value]) {
          name = "unknown enum";
        } else {
          name = arg.enum[value].name;
        }
      }

      return name;
    },
    write: function(buffer, value, index) {
      var data = parseInt(value, 10);
      buffer.writeInt32LE(data, index);
      return buffer;
    },
    length: 4
  }
};
