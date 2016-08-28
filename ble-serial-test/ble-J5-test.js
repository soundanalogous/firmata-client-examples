/*
 * To run with logging run as:
 * DEBUG=ble-serial node ble-j5-test
 *
 * To run, install the following modules:
 * npm install ble-serial
 * npm install johnny-five
 *
 * change the timeout value on line 422 in boards.js of the johnny-five
 * lib folder from 1e4 to 1e5
 *
 * wiring:
 * button to pin D2
 * button to pin A2
 * LED to pin D10
 * servo to pin D8 (need a servo that works at 3.3v or lower)
 * potentiometer to pin A0
 */

var BLESerialPort = require('ble-serial').SerialPort;
var five = require('johnny-five');

//use the virtual serial port to send a command to a firmata device
var bleSerial = new BLESerialPort();
var board = new five.Board({
  port: bleSerial,
  timeout: 1e5,
  repl: false
});

board.on("ready", function() {
  var lastVal = 0;

  var servo = new five.Servo({
    pin: 9,
    //fps: 30
  });

  var led = new five.Led(10);
  led.blink(500);

  var btnD = new five.Button(2);
  btnD.on("down", function () {
    console.log("button 2 down");
  });

  var btnA = new five.Button("A2");
  btnA.on("down", function () {
    console.log("button A2 down");
  });

  servo.sweep();

  // var pot = new five.Sensor({
  //   pin: "A0",
  //   freq: 30
  // });

  // pot.on("data", function () {
  //   if (this.raw !== lastVal) {
  //     console.log(this.raw);
  //   }
  //   lastVal = this.raw;
  // });

  /* you'll need a servo that can run at 3.3 volts or lower */
  // var servo = new five.Servo({
  //   pin: 8
  // });
  // servo.center();
  // servo.sweep();
});
