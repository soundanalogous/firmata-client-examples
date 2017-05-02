var five = require("johnny-five");
var board = new five.Board({
  timeout: 1e5,
  repl: false
});

board.on("ready", function() {
  console.log("READY");

  board.samplingInterval(30);

  var led = new five.Led(2);
  led.blink(500);

  var compass = new five.Compass({
    controller: "HMC6352"
  });
  compass.on("change", function() {
    console.log("  heading : ", Math.floor(this.heading));
    //console.log("  bearing : ", this.bearing.name);
  });

  board.on("string", function (message) {
    console.log(message);
  });
});
