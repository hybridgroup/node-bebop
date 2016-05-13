"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.GPSSettings.resetHome();
  drone.WifiSettings.outdoorSetting(1);

  drone.on("PositionChanged", function(data) {
    console.log(data);
  });
});
