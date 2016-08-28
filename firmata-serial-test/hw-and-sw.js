var Board = require("firmata").Board;
var board = new Board("/dev/cu.usbmodem14531");

board.on("ready", function() {
  console.log("READY");

  var SW_SERIAL0 = board.SERIAL_PORT_IDs.SW_SERIAL0;
  var HW_SERIAL1 = board.SERIAL_PORT_IDs.HW_SERIAL1;
  var maxBytesToRead = 4;

  this.pinMode(4, this.MODES.OUTPUT);
  this.digitalWrite(4, this.HIGH);

  board.serialConfig({
    portId: SW_SERIAL0,
    baud: 9600,
    rxPin: 8,
    txPin: 9
  });

  board.serialRead(SW_SERIAL0, function(data) {
    console.log("*****" + data);
    //console.log("*****" + new Buffer(data).toString("ascii"));
  });


  board.serialConfig({
    portId: HW_SERIAL1,
    baud: 9600
  });

  board.serialRead(HW_SERIAL1, function(data) {
    console.log("-----" + new Buffer(data).toString("ascii"));
  });

});
