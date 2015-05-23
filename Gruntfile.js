"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    eslint: { target: ["Gruntfile.js", "lib", "test", "examples"] },

    simplemocha: {
      all: { src: ["test/*.js"] }
    }
  });

  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-simple-mocha");

  grunt.registerTask("default", ["eslint", "simplemocha"]);
  grunt.registerTask("lint", ["eslint"]);
  grunt.registerTask("test", ["simplemocha"]);
};

