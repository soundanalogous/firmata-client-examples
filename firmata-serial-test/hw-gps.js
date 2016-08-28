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

    var HW_SERIAL = board.SERIAL_PORT_IDs.HW_SERIAL1;
    var maxBytesToRead = 4;

    board.serialConfig({
      portId: HW_SERIAL,
      baud: 9600
    });

    // leave 2nd parameter (maxBytesToRead) to read all available bytes in buffer
    // board.serialRead(HW_SERIAL, maxBytesToRead, function(data) {
    board.serialRead(HW_SERIAL, function(data) {
      console.log(new Buffer(data).toString("ascii"));
    });

    board.on("string", function (message) {
      console.log(message);
    });

    // log serial pin numbers
    for (var pin in board.pins) {
      var modes = board.pins[pin].supportedModes;
      for (var mode in modes) {
        if (modes[mode] === board.MODES.SERIAL) {
          console.log("serial pin: " + pin);
        }
      }
    }

  });
});
