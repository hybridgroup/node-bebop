/*
This example will create a file named `video.h264` with the streamed video data from the drone.

Then in a separate console, you can open a playback window using ffplay (part of ffmpeg):

      ffplay ./video.h264
*/

"use strict";

var bebop = require("../."),
    fs = require("fs");

var output = fs.createWriteStream("./video.h264"),
    drone = bebop.createClient(),
    video = drone.getVideoStream();

video.pipe(output);

drone.connect(function() {
  drone.MediaStreaming.videoEnable(1);
  drone.MediaStreaming.videoStreamMode(0);
});
