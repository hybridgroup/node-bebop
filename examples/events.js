"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

var alreadyFlying = false;

drone.connect(function() {
  drone.on("GPSFixStateChanged", function(data) {
    console.log("GPSFixStateChanged", data);
  });

  drone.on("MavlinkPlayErrorStateChanged", function(data) {
    console.log("MavlinkPlayErrorStateChanged", data);
  });

  drone.on("MavlinkFilePlayingStateChanged", function(data) {
    console.log("MavlinkFilePlayingStateChanged", data);
  });

  drone.on("AvailabilityStateChanged", function(data) {
    console.log("AvailabilityStateChanged", data);
    if (data.AvailabilityState === 1 && !alreadyFlying) {
      alreadyFlying = true;
      console.log("This is where we would try to call Mavlink.start()");
      //drone.Mavlink.start("/data/ftp/internal_000/flightplans/flightPlan.mavlink", 0);
    }
  });

  drone.on("ComponentStateListChanged", function(data) {
    console.log("ComponentStateListChanged", data);
  });

  drone.on("ready", function() {
    console.log("ready");
  });

  drone.on("battery", function(data) {
    console.log(data);
  });

  drone.on("landed", function() {
    console.log("landed");
  });

  drone.on("takingOff", function() {
    console.log("takingOff");
  });

  drone.on("hovering", function() {
    console.log("hovering");
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
