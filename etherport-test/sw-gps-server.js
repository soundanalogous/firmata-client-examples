var Firmata = require("firmata").Board;
var EtherPort = require("etherport");
var board = new Firmata(new EtherPort(3030));

board.on("ready", function() {
  console.log("READY");

  var SW_SERIAL0 = board.SERIAL_PORT_IDs.SW_SERIAL0;
  var maxBytesToRead = 4;

  board.serialConfig({
    portId: SW_SERIAL0,
    baud: 9600,
    rxPin: 8,
    txPin: 9
  });

  board.serialRead(SW_SERIAL0, maxBytesToRead, function(data) {
    console.log(new Buffer(data).toString("ascii"));
  });

});
