var Board = require("firmata");

Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }
  var board = new Board(port.comName);

  board.on("ready", function() {
    console.log("ready");
    board.pinMode(8, board.MODES.OUTPUT);
    board.pinMode(9, board.MODES.OUTPUT);

    board.digitalWrite(8, 1);
    board.digitalWrite(9, 1);
  });
});
