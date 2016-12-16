// Example using ESP8266 over a serial transport (StandardFirmata)
// A minor change to StandardFirmata is necessary in order for this to work. See
// https://github.com/firmata/arduino/issues/338#issuecomment-267527366 for details.

var Board = require("firmata");

Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }
  var board = new Board(port.comName);

  board.on("ready", function() {
    console.log("READY");
    console.log(
      board.firmware.name + "-" +
      board.firmware.version.major + "." +
      board.firmware.version.minor
    );

    var state = 1;

    this.pinMode(2, this.MODES.OUTPUT);

    setInterval(function() {
      this.digitalWrite(2, (state ^= 1));
    }.bind(this), 500);

    this.analogRead(0, function(value) {
      console.log(value);
    });

  });
});
