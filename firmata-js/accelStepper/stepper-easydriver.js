var Board = require("firmata");

Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }

  var board = new Board(port.comName);

  board.on("ready", function() {
    console.log("READY");
    console.log(
      board.firmware.name + "-" +
      board.firmware.version.major + "." +
      board.firmware.version.minor
    );

    board.accelStepperConfig({
      deviceNum: 0,
      type: board.STEPPER.TYPE.DRIVER,
      stepPin: 9,
      directionPin: 8,
      // enablePin: 2,
      // invertPins: [2]
    });

    let startTime = new Date();
   
    // board.accelStepperEnable(0, true);

    board.accelStepperSpeed(0, 400 * 8);
    board.accelStepperAcceleration(0, 100 * 8);

    board.accelStepperStep(0, 1000 * 8, function(position) {
      console.log("accelStepperStep complete");
      console.log("Current position: " + position);
      console.log("Run time = " + (new Date() - startTime));
    });

    // board.accelStepperTo(0, 1000 * 8, function(position) {
    //   console.log("accelStepperTo complete");
    //   console.log("Current position: " + position);
    //   console.log("Run time = " + (new Date() - startTime));
    // });

    setTimeout(function() {
      // board.accelStepperZero(0);

      // board.accelStepperStop(0);

      board.accelStepperReportPosition(0, function(position) {
        console.log("accelStepperReportPosition");
        console.log("Current position: " + position);
        console.log("Run time = " + (new Date() - startTime));      
      });

    }, 2000);

  });
});
