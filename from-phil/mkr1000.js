var EtherPortClient = require("etherport-client").EtherPortClient;
var five = require('johnny-five');

var board = new five.Board({
  port: new EtherPortClient({
    host: "10.4.32.62",
    port: 3030
  }),
  timeout: 1e5,
  repl: false
});

board.on("ready", function() {
  console.log("READY!");
  var lastVal = 0;
  var intVal = 0;

  var led = new five.Led(6);
  led.blink(200);

  var pwm = new five.Led(4);

  var pot = new five.Sensor({
    pin: "A0",
    freq: 50
  });

  var servo = new five.Servo({
    pin: 5,
    fps: 5
  });

  pot.scale(0, 180).on("change", function() {
    intVal = Math.floor(this.value);
    if (intVal != lastVal) {
      pwm.brightness(intVal);
      servo.to(intVal);
    }
    lastVal = intVal;
  });
});
