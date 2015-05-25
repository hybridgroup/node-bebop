"use strict";

var bebop = require("../."),
    cv = require("opencv");

var drone = bebop.createClient(),
    mjpg = drone.getMjpegStream(),
    s = new cv.ImageStream(),
    w = new cv.NamedWindow("Video", 0);

mjpg.pipe(s);

s.on("data", function(matrix) {
  w.show(matrix);
  w.blockingWaitKey(0, 10);
});

drone.connect();
