
var Board = require('firmata');

Board.requestPort(function(error, port) {
  var board = new Board(port.comName);

  board.on('reportversion', function() {
    console.info('name: [' + board.name + ' ' + board.version.major + '.' + board.version.minor + ']');
  });

  board.on('open', function() { console.info('open'); });
  board.on('error', function(err) { console.info('error: ' + err); process.exit(-1);});
  board.on('ready', function() {

    console.log("READY!");
    console.log(
      board.firmware.name + "-" +
      board.firmware.version.major + "." +
      board.firmware.version.minor
    );

    var digital = 13;
    var state = 0;
    board.pinMode(digital, board.MODES.OUTPUT);

    setInterval(function() {
      board.digitalWrite(digital, state++ % 2);
      console.log('state ', (state % 2));

      if (state === 50) { process.exit(0); }
    }, 50);

  });
});
