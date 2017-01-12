/*
 * Compile and upload StandardFirmataBLE from the firmata/arduino ble branch.
 *
 * To run, install the following modules:
 * npm install ble-serial
 * npm install firmata
 *
 * To run with logging run as:
 * DEBUG=ble-serial node ble-ard101-test
 *
 * wiring:
 * button to pin D2
 * button to pin A2
 * LED to pin D10
 * potentiometer to pin A0
 */

var BLESerialPort = require('ble-serial').SerialPort;
var Firmata = require('firmata').Board;
var bleConnection = new BLESerialPort({
  localName: 'FIRMATA'
  //peripheral: 'FIRMATA'
  // serviceId: '', //OPTIONAL
  // transmitCharacteristic: '', //OPTIONAL
  // receiveCharacteristic: '' //OPTIONAL
});

//use the virtual serial port to send a command to a firmata device
var board = new Firmata(bleConnection, {
  reportVersionTimeout: 1000,
  samplingInterval: 30
});
// var board = new Firmata(bleConnection, {
//   samplingInterval: 30,
//   skipCapabilities: true,
//   pinCount: 21,
//   analogPins: [14, 15, 16, 17, 18, 19]
// });

board.on("close", function() {
  console.log("******************* CONNECTION CLOSED *********************");
});

board.on("disconnect", function() {
  console.log("**************** CONNECTION DISCONNECTED *******************");
});

board.on("error", function(error) {
  console.log("ERROR: " + error);
});

board.on("ready", function() {
  console.log(
    board.firmware.name + "-" +
    board.firmware.version.major + "." +
    board.firmware.version.minor
  );

  var state = 1;
  var blinkPin = 8;
  var dBtnPin = 2;
  var aBtnPin = 16;
  var lastVal = 0;

  board.pinMode(dBtnPin, board.MODES.INPUT);
  // use analog pin as digital pin
  board.pinMode(aBtnPin, board.MODES.INPUT);

  setInterval(function() {
    board.digitalWrite(blinkPin, (state ^= 1));
  }, 500);

  board.analogRead(0, function(val) {
    if (val !== lastVal) {
      console.log(val);
    }
    lastVal = val;
  });

  board.digitalRead(dBtnPin, function (val) {
    console.log("pin " + dBtnPin + " value: " + val);
  });

  board.digitalRead(aBtnPin, function (val) {
    console.log("pin " + aBtnPin + " value: " + val);
  });

});

function exitHandler(options, err) {
  // if (options.cleanup) {
  //   console.log("should reset");
  //   board.reset();
  //   bleConnection.close();
  // }
  if (err) console.log(err.stack);
  if (options.exit) {
    console.log("exit");
    //board.reset();
    //board.reportAnalogPin(0, 0);
    bleConnection.close();
    process.exit();
  }
}

// //do something when app is closing
// process.on('exit', exitHandler.bind(null, {cleanup:true}));

// //catches ctrl+c event
//process.on('SIGINT', exitHandler.bind(null, {exit:true}));
