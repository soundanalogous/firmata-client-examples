var Board = require("firmata").Board;
var board = new Board("/dev/cu.usbmodem14531");

board.on("ready", function() {
  console.log("READY");

  var SW_SERIAL0 = board.SERIAL_PORT_IDs.SW_SERIAL0;
  var HW_SERIAL1 = board.SERIAL_PORT_IDs.HW_SERIAL1;
  var HW_SERIAL2 = board.SERIAL_PORT_IDs.HW_SERIAL2;
  var HW_SERIAL3 = board.SERIAL_PORT_IDs.HW_SERIAL3;
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

  board.serialConfig({
    portId: HW_SERIAL3,
    baud: 9600
  });

  board.serialRead(HW_SERIAL3, function(data) {
    console.log("^^^^^" + data);
  });

  board.serialConfig({
    portId: SW_SERIAL0,
    baud: 9600,
    rxPin: 10,
    txPin: 11
  });

  board.serialRead(SW_SERIAL0, maxBytesToRead, function(data) {
    console.log("#####" + data);
  });

});
