/*
 * To run with logging run as:
 * DEBUG=ble-serial node ble-nano-test
 *
 * To run, install the following modules:
 * npm install ble-serial
 * npm install firmata
 *
 * wiring:
 * button to pin D2
 * potentiometer to pin A0
 */

var BLESerialPort = require('ble-serial').SerialPort;
var Firmata = require('firmata').Board;

//use the virtual serial port to send a command to a firmata device
// need to skip capabilities for BLE Nano
// var board = new Firmata(new BLESerialPort({
//   // serviceId: '', //OPTIONAL
//   // transmitCharacteristic: '', //OPTIONAL
//   // receiveCharacteristic: '' //OPTIONAL
// }), {
//   samplingInterval: 33,
//   skipCapabilities: true,
//   pinCount: 15,
//   analogPins: [8, 9, 10, 11, 12, 14]
// });

var board = new Firmata(new BLESerialPort({
  // serviceId: '', //OPTIONAL
  // transmitCharacteristic: '', //OPTIONAL
  // receiveCharacteristic: '' //OPTIONAL
}));

board.on("ready", function() {
  console.log(
    board.firmware.name + "-" +
    board.firmware.version.major + "." +
    board.firmware.version.minor
  );

  var state = 1;
  var blinkPin = 13;
  var dBtnPin = 2;
  var aBtnPin = 16;
  var lastVal = 0;

  // board.pinMode(dBtnPin, board.MODES.INPUT);

  setInterval(function() {
    board.digitalWrite(blinkPin, (state ^= 1));
  }, 2500);

  // board.analogRead(2, function(val) {
  //   //if (val !== lastVal) {
  //   console.log(val);
  //   //}
  //   lastVal = val;
  // });

  // board.digitalRead(dBtnPin, function (val) {
  //   console.log("pin " + dBtnPin + " value: " + val);
  // });

});
