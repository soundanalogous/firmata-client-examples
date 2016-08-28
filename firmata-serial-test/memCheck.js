var Board = require("firmata").Board;

Board.requestPort(function(error, port) {
  var board = new Board(port.comName);

  board.on("ready", function() {

    console.log("READY");
    console.log(
      board.firmware.name + "-" +
      board.firmware.version.major + "." +
      board.firmware.version.minor
    );

    board.on("string", function (message) {
      console.log(message);
    });

  });
});