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
 *
 * NOTE:
 * In order for this example to work, you will need to patch the
 * RedBearLab nRF51822-Arduino core library by following these instructions:
 * 1. Install v1.0.7 of the RedBear nRF51822 Boards package using the Arduino
 *    Boards Manager (Tools > Boards > Boards Manager...)
 * 2. Clone https://github.com/soundanalogous/nRF51822-Arduino
 * 3. From the cloned repo, copy the contents of the RBL_nRF51822 directory to
 *    the /1.0.7/ directory in the /RedBear/hardware/nRF51822/ package that was
 *    installed via the Arduino Board Manager. On OS X this is located in:
 *    ~/Library/Arduino15/packages/
 * 4. Copy StandardFirmataBLE and uncomment the 5 line #ifdef BLE_NANO block in
 *    bleConfig.h (File > Examples > Firmata > StandardFirmataBLE)
 * 5. Compile and upload your copy of StandardFirmataBLE to the BLE Nano
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
  }, 500);

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
