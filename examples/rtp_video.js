/*
This example enables streamed RTC video data from the drone

Run this example, then in a separate console, you can open a playback window
using mplayer (part of ffmpeg):

      mplayer examples/bebop.sdp
*/

"use strict";

var bebop = require("../.");

var drone = bebop.createClient();

drone.connect(function() {
  drone.MediaStreaming.videoStreamMode(0);
  drone.PictureSettings.videoStabilizationMode(3);
  drone.MediaStreaming.videoEnable(1);
});
