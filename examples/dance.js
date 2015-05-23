"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.takeOff();

  setTimeout(function() {
    drone.right(10);
  }, 3000);

  setTimeout(function() {
    drone.stop();
  }, 4000);

  setTimeout(function() {
    drone.left(10);
  }, 5000);

  setTimeout(function() {
    drone.stop();
  }, 6000);

  setTimeout(function() {
    drone.land();
  }, 7000);
});
