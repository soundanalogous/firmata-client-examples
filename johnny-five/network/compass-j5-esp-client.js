var EtherPortClient = require("etherport-client").EtherPortClient;
var five = require('johnny-five');

var board = new five.Board({
  port: new EtherPortClient({
    host: "192.168.86.36",
    port: 3030
  }),
  //timeout: 1e5,
  repl: false
});

board.on("ready", function() {
  console.log("READY!");

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
