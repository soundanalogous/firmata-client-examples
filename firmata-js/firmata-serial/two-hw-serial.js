var Board = require("firmata").Board;
var board = new Board("/dev/cu.usbmodem14531");

board.on("ready", function() {
  console.log("READY");

  var HW_SERIAL1 = board.SERIAL_PORT_IDs.HW_SERIAL1;
  var HW_SERIAL2 = board.SERIAL_PORT_IDs.HW_SERIAL2;
  var maxBytesToRead = 4;

  board.serialConfig({
    portId: HW_SERIAL1,
    baud: 9600
  });

  board.serialRead(HW_SERIAL1, function(data) {
    console.log("*****" + data);
    //console.log("*****" + new Buffer(data).toString("ascii"));
  });


  board.serialConfig({
    portId: HW_SERIAL2,
    baud: 9600
  });

  board.serialRead(HW_SERIAL2, function(data) {
    console.log("-----" + new Buffer(data).toString("ascii"));
  });

});
