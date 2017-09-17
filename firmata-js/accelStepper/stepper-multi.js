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
      directionPin: 8
    });

    board.accelStepperConfig({
      deviceNum: 1,
      type: board.STEPPER.TYPE.FOUR_WIRE,
      motorPin1: 2,
      motorPin2: 3,
      motorPin3: 4,
      motorPin4: 5,
      stepType: board.STEPPER.STEPTYPE.WHOLE,
      // stepType: board.STEPPER.STEPTYPE.HALF
    });

    board.accelStepperSpeed(0, 400 * 8);
    board.accelStepperSpeed(1, 400);
    
    board.multiStepperConfig({
      groupNum: 0,
      devices: [0, 1]
    });

    board.multiStepperTo(0, [2000 * 8, 2000], function() {
      
      board.accelStepperReportPosition(0, function(value) {
        console.log("Stepper 0 position: " + value);
      });
      
      board.accelStepperReportPosition(1, function(value) {
        console.log("Stepper 1 position: " + value);
      });
    
    });

    // setTimeout(function() {
    //   board.multiStepperStop(0);
    // }, 2000);

  });
});
