"use strict";

var ffmpeg = require("fluent-ffmpeg");

if (process.env.NODE_ENV === "test") {
  ffmpeg = function(source) {
    return {
      toFormat: function() {
        return this;
      },
      size: function() {
        return this;
      },
      inputFPS: function() {
        return this;
      },
      outputOptions: function() {
        return this;
      },
      writeToStream: function(dst) {
        source.on("data", function(data) {
          dst.write(data);
        });
      }
    };
  };
}

module.exports = ffmpeg;
