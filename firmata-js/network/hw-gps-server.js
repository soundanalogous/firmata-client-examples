var Firmata = require("firmata").Board;
var EtherPort = require("etherport");
var board = new Firmata(new EtherPort(3030));

board.on("ready", function() {
  console.log("READY");
  console.log(
    board.firmware.name + "-" +
    board.firmware.version.major + "." +
    board.firmware.version.minor
  );

  var HW_SERIAL1 = board.SERIAL_PORT_IDs.HW_SERIAL1;
  var maxBytesToRead = 4;
  var state = 1;

  board.serialConfig({
    portId: HW_SERIAL1,
    baud: 9600
  });

  // leave 2nd parameter (maxBytesToRead) to read all available bytes in buffer
  // board.serialRead(HW_SERIAL1, maxBytesToRead, function(data) {
  board.serialRead(HW_SERIAL1, function(data) {
    console.log(new Buffer(data).toString("ascii"));
  });

  this.pinMode(8, this.MODES.OUTPUT);

  setInterval(function() {
    this.digitalWrite(8, (state ^= 1));
  }.bind(this), 500);

  this.analogRead(0, function(value) {
    console.log(value);
  });

});
