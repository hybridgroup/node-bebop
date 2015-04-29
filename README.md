# node-bebop

Control your Parrot Bebop drone using JavaScript!

This module allows you to control, receive nav data, and receive video data from the [Parrot Bebop](http://www.parrot.com/products/bebop-drone/) WiFi controlled drone.

The implementation attempts to use the same interface as the [node-ar-drone](https://github.com/felixge/node-ar-drone) node module from [@felixge](https://github.com/felixge/), so it can be mostly NodeCopter compatible.

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

## Release History

None yet...

## License

Copyright (c) 2015 The Hybrid Group. Licensed under the MIT license.
