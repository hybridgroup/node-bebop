"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.Piloting.takeOff();

  setTimeout(function() {
    drone.Piloting.landing();
  }, 5000);
});
