var EtherPort = require("etherport");
var five = require('johnny-five');

var board = new five.Board({
  port: new EtherPort(3030),
  repl: false
});

board.on("ready", function() {
  console.log("READY!");

  var led = new five.Led(8);
  led.blink(500);
});
