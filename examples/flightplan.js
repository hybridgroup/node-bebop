"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.Mavlink.start("internal_000/flightplans/flightplan.mavlink", 0);

  drone.on("MavlinkPlayErrorStateChanged", function(data) {
    console.log(data);
  });

  drone.on("MavlinkFilePlayingStateChanged", function(data) {
    console.log(data);
  });

  drone.on("navData", function (data) {
    console.log("Alt changed: " + data);
  });

  drone.on("ready", function () {
    console.log("ready");
  });

  drone.on("battery", function (data) {
    console.log(data);
  });

  drone.on("landed", function () {
    console.log("landed");
  });

  drone.on("takingOff", function () {
    console.log("takingOff");
  });

  drone.on("hovering", function () {
    console.log("hovering");
  });

  drone.on("FlyingStateChanged", function () {
    console.log("FlyingStateChanged");
  });

  drone.on("BatteryStateChanged", function () {
    console.log("BatteryStateChanged");
  });

  drone.on("takingOff", function() {
    console.log("takingOff");
  });

  drone.on("flying", function() {
    console.log("flying");
  });

  drone.on("landing", function() {
    console.log("landing");
  });

  drone.on("unknown", function(data) {
    console.log("unknown", data);
  });
});
