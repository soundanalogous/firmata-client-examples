var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  board.samplingInterval(1000);

  var led = new five.Led(13);
  led.blink();

  var thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: 2,
    freq: 2000
  });

  thermometer.on("change", function() {
    console.log(this.fahrenheit.toFixed(2) + "°F");
    // console.log("0x" + this.address.toString(16));
  });

  var compass = new five.Compass({
    controller: "HMC6352"
  });
  compass.on("change", function() {
    console.log("  heading : ", Math.floor(this.heading));
    //console.log("  bearing : ", this.bearing.name);
  });

  board.on("string", function (message) {
    console.log(message);
  });
});
