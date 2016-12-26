var bebop = require("../.");
var drone = bebop.createClient();

drone.on("CurrentDateChanged", function(data) {
  console.log("CurrentDateChanged", data);
});

drone.on("CurrentTimeChanged", function(data) {
  console.log("CurrentTimeChanged", data);
});

drone.connect(function(){
  var today = new Date().toISOString();
  drone.Common.currentDate(today);
  drone.Common.currentTime(today);
});
