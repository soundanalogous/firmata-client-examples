/*
 * To run in Debug mode: DEBUG=etherport-client node blink-j5-wifi
 */
var EtherPortClient = require("etherport-client").EtherPortClient;
var five = require('johnny-five');

var board = new five.Board({
  port: new EtherPortClient({
    host: "10.0.0.16",
    port: 3030
  }),
  timeout: 1e5,
  repl: false
});

board.on("ready", function() {
  console.log("READY!");

  var led = new five.Led(8);
  led.blink(500);

});
