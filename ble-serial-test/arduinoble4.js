/*
 * To run, install the following modules:
 * npm install ble-serial
 * npm install johnny-five
 *
 * wiring:
 * button to pin D2
 * button to pin A2
 * LED to pin D10
 * potentiometer to pin A0
 */

var BLESerialPort = require('ble-serial').SerialPort;
var five = require('johnny-five');

//use the virtual serial port to send a command to a firmata device
var bleSerial = new BLESerialPort();
// slow down the sampling interval - may need to be a higher value if using
// lots of actuators
var board = new five.Board({
    port: bleSerial,
    samplingInterval: 30,
    repl: false
});

board.on("ready", function () {
    var lastVal = 0;
    var intVal = 0;

    // Servo defaults to 100 fps which is way to fast
    // need to drop it to 20 fps
    var servo = new five.Servo({
        pin: 9,
        fps: 20
    });

    var pwm = new five.Led(6);

    var led = new five.Led(5);
    led.blink(500);

    var btnD = new five.Button(2);
    btnD.on("down", function () {
        console.log("button 2 down");
    });

    var btnA = new five.Button("A2");
    btnA.on("down", function () {
        console.log("button A2 down");
    });

    // for some strange reason (likely a bug) the fps value set on the Servo
    // constructor is not used for sweep and must be specified separately here
    //servo.sweep({fps: 20}); // need to slow this down or it will crash

    var pot = new five.Sensor({
        pin: "A0",
        freq: 50
    });

    //pot.on("data", function () {
    pot.scale(0, 180).on("change", function () {
        if (this.raw !== lastVal) {
            intVal = Math.floor(this.value);
            console.log(this.value + " " + intVal);
            // you can only send data from one component or the sketch will crash
            // the work around will be to add a TX buffer to ble-serial and flush
            // it on a timed interval
            servo.to(intVal);
            pwm.brightness(intVal);
            //led.brightness(intVal);
        }
        lastVal = this.raw;
    });
});