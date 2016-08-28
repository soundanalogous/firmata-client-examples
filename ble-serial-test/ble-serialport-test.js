/*
 * To run, install the following modules:
 * npm install ble-serial
 * npm install firmata
 *
 * wiring:
 * button to pin D2
 * button to pin A2
 * LED to pin D10
 * servo to pin D8 (optional)
 * potentiometer to pin A0
 */

var BleSerialPort = require("ble-serialport").SerialPort;
var Firmata = require("firmata").Board;

//use the virtual serial port to send a command to a firmata device
var bsp = new BleSerialPort({name: "FIRMATA"});

bsp.connect().then(function () {
  var board = new Firmata(bsp);

  board.on("ready", function() {

    var state = 1;
    var degrees = 10;
    var incrementer = 10;
    var blinkPin = 10;
    var servoPin = 8;
    var dBtnPin = 2;
    var aBtnPin = 16;
    var lastVal = 0;

    board.pinMode(dBtnPin, board.MODES.INPUT);
    // use analog pin as digital pin
    board.pinMode(aBtnPin, board.MODES.INPUT);
    // board.pinMode(servoPin, board.MODES.SERVO);

    setInterval(function() {
      board.digitalWrite(blinkPin, (state ^= 1));
    }, 500);

    // board.servoConfig(servoPin);
    // board.servoWrite(servoPin, 0);
    // setInterval(function () {
    //   if (degrees >= 180 || degrees === 0) {
    //     incrementer *= -1;
    //   }
    //   degrees += incrementer;
    //   board.servoWrite(servoPin, degrees);
    // }, 50);

    // analog values will be jittery if servo is connected
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

});
