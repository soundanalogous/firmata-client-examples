var EtherPort = require("etherport");
var five = require('johnny-five');

var board = new five.Board({
  port: new EtherPort(3030),
  timeout: 1e5,
  repl: false
});

board.on("ready", function() {
  console.log("READY!");

  // change to the pin number your LED is connected to
  // pin 2 is SDA on the Sparkfun Thing board so don't use that
  // pin 5 is the onboard LED on the Thing
  var led = new five.Led(2);
  led.blink(500);

  var compass = new five.Compass({
    controller: "HMC6352"
  });

  compass.on("change", function() {
    console.log("heading : ", Math.floor(this.heading));
    console.log("bearing : ", this.bearing.name);
  });
});
