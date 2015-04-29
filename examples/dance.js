var bebop = require('../.');

var drone = bebop.createClient();

drone.connect(function() {
  drone.takeOff();

  setTimeout(function() {
    drone.right(50);
  }, 3000);

  setTimeout(function() {
    drone.left(50);
  }, 5000);

  setTimeout(function() {
    drone.land();
  }, 8000);
});
