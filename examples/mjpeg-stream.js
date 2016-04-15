"use strict";

var bebop = require("../."),
    cv = require("opencv");

var drone = bebop.createClient(),
    mjpg = drone.getMjpegStream(),
    buf = null,
    w = new cv.NamedWindow("Video", 0);

drone.connect(function() {
  drone.MediaStreaming.videoEnable(1);
});

mjpg.on("data", function(data) {
  buf = data;
});

setInterval(function() {
  if (buf == null) {
    return;
  }

  try {
    cv.readImage(buf, function(err, im) {
      if (err) {
        console.log(err);
      } else {
        if (im.width() < 1 || im.height() < 1) {
          console.log("no width or height");
          return;
        }
        w.show(im);
        w.blockingWaitKey(0, 50);
      }
    });
  } catch(e) {
    console.log(e);
  }
}, 100);
