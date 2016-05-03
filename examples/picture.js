"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.on("PictureEventChanged", function(data) {
    console.log("PictureEventChanged", data);
  });
  drone.MediaRecord.picture(0);
});
