/*
 * To run in Debug mode: DEBUG=etherport-client node wifi-test
 */
var Firmata = require("firmata").Board;
var EtherPort = require("etherport");
var board = new Firmata(new EtherPort(3030), {
  samplingInterval: 100 // decrease analog read frequency
});

// may take several seconds to establish a connection
process.stdout.write("connecting");
var connectionProgress = setInterval(function() {
  process.stdout.write(".");
}, 500);

board.on("ready", function() {
  clearInterval(connectionProgress);
  console.log("\nREADY!");
  console.log(
    board.firmware.name + "-" +
    board.firmware.version.major + "." +
    board.firmware.version.minor
  );

  // onboard LED and button
  var ledPin = 5;
  var buttonPin = 0;
  var buttonState = 1;

  this.pinMode(ledPin, this.MODES.OUTPUT);
  this.pinMode(buttonPin, this.MODES.INPUT);

  setInterval(function() {
    this.digitalWrite(ledPin, (buttonState ^= 1));
  }.bind(this), 500);

  board.digitalRead(buttonPin, function (val) {
    console.log("pin " + buttonPin + " value = " + val);
  });

  this.analogRead(0, function(val) {
    console.log(val);
  });

});
