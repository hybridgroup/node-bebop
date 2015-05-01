var bebop = require('../.');
var fs = require('fs');

var drone = bebop.createClient();

fs.writeFile('./video.h264', function(err) {
  if (err) throw err;
});

drone.connect(function() {
  drone.on('video', function(data) {
    // you can watch this video with ffplay or mplayer
    fs.appendFile('./video.h264', data, function(err) {
      if (err) throw err;
    });
  });
});
