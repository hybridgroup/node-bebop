"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.on("ready", function(){
    console.log("ready");
  });

  drone.on("GPSFixStateChanged", function(data){
    console.log("GPSFixStateChanged", data);
  })

  drone.on("GPSUpdateStateChanged", function(data){
    console.log("GPSUpdateStateChanged", data);
  });

  drone.on("GPSSettingsState", function(data){
    console.log("GPSSettingsState", data);
  });

  drone.on("GPSState", function(data){
    console.log("GPSState", data);
  });

  drone.on("flying", function(){
    console.log("flying");
  });

  drone.on("landing", function(){
    console.log("landing");
  });

  drone.GPSSettings.ResetHome()
});
