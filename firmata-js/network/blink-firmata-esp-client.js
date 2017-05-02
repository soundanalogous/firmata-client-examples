/*
 * To run in Debug mode: DEBUG=etherport-client node wifi-test
 */
var Firmata = require("firmata").Board;
var EtherPortClient = require("etherport-client").EtherPortClient;
var board = new Firmata(new EtherPortClient({
  host: "192.168.86.36",
  port: 3030
}));

board.on("ready", function() {
  console.log("READY!");
  console.log(
    board.firmware.name + "-" +
    board.firmware.version.major + "." +
    board.firmware.version.minor
  );

  var state = 1;
  var lastVal = 0;

  this.pinMode(2, this.MODES.OUTPUT);

  setInterval(function() {
    this.digitalWrite(2, (state ^= 1));
  }.bind(this), 500);

  this.analogRead(0, function(value) {
    if (value != lastVal) {
      console.log(value);
    }
  });

});
