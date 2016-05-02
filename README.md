# node-bebop
[![Build Status](https://travis-ci.org/hybridgroup/node-bebop.svg?branch=master)](https://travis-ci.org/hybridgroup/node-bebop)
[![Test Coverage](https://codeclimate.com/github/hybridgroup/node-bebop/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/node-bebop/coverage)  

Control your Parrot Bebop drone using JavaScript!

This module allows you to control, receive nav data, and receive video data from the [Parrot Bebop](http://www.parrot.com/products/bebop-drone/) WiFi controlled drone.

The implementation attempts to use the same interface as the [node-ar-drone](https://github.com/felixge/node-ar-drone) node module from [@felixge](https://github.com/felixge/) and [@rmehner](https://github.com/rmehner), so it can be mostly NodeCopter compatible.

## How to Install

To get started, install the npm module:

    $ npm install node-bebop


## How to Use

This simple example takes off, then lands after 5 seconds:

```javascript
var bebop = require('node-bebop');

var drone = bebop.createClient();

drone.connect(function() {
  drone.takeOff();

  setTimeout(function() {
    drone.land();
  }, 5000);
});

```

## NodeCopter-compatible API

### createClient()

Returns a `new Bebop`

### connect(callback)

Connects to the drone and executes the callback when the drone is ready to fly.

### getVideoStream()

Returns a stream of h.264 frames.

### getMjpegStream()

Returns a stream of mjpeg images.

### takePicture()

Takes a picture and saves the image to the internal storage.

### startRecording()

Starts recording video to the internal storage.

### stopRecording()

Stops a previously started recording and saves to internal storage.

#### takeOff(callback)

Tell the drone to lift off the ground. Executes the callback when the drone is in the air.

#### land(callback)

Land the drone. Executes the callback when the drone is on the ground.

#### stop()

Tell the drone to hover in place.

#### emergency()

Tell the drone to drop like a stone.

#### up(val)

Cause the drone to increase in altitude at 0-100 speed

#### down(val)

Cause the drone to decrease in altitude at 0-100 speed

#### right(val)

Cause the drone to move to the right at 0-100 speed

#### left(val)

Cause the drone to move to the left at 0-100 speed

#### forward(val)

Cause the drone to move forward at 0-100 speed

#### backward(val)

Cause the drone to move backward at 0-100 speed

#### clockwise(val)

Cause the drone to spin in a clockwise direction at 0-100 speed

#### counterClockwise(val)

Cause the drone to spin in a counter clockwise direction at 0-100 speed

#### frontFlip()

Tell the drone to do a front flip

#### backFlip()

Tell the drone to do a back flip

#### rightFlip()

Tell the drone to do a flip to the right

#### leftFlip()

Tell the drone to do a flip to the left

## Full API

The `node-bebop` module supports both the above NodeCopter-compatible interface, as well as the full Parrot 3.x API command and events set. For info on the full API, please check out the docs directory here:

https://github.com/hybridgroup/node-bebop/blob/master/docs/

## Release History

0.6.0 Update for new 3.2.x drone firmware

0.5.0 Refactor Bebop command builder

0.4.0 Initial support for full Bebop command set

0.3.0 Add getVideoStream, getMjpegStream, picture taking and video recording methods

0.2.0 Add flip commands, implement ack processes, emit flying state and battery events

0.1.0 Initial release

## License

Copyright (c) 2015-2016 The Hybrid Group. Licensed under the MIT license.
