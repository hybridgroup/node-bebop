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
### API

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


#### Piloting.flatTrim()

Do a flat trim

#### Piloting.takeOff()

Ask the drone to take off

#### Piloting.pcmd(obj)

Ask the drone to move around.

* **flag** Boolean flag to activate roll/pitch movement
* **roll** Roll consign for the drone [-100;100]
* **pitch** Pitch consign for the drone [-100;100]
* **yaw** Yaw consign for the drone [-100;100]
* **gaz** Gaz consign for the drone [-100;100]
* **psi** [NOT USED] - Magnetic north heading of the controlling device (deg) [-180;180]

#### Piloting.landing()

Ask the drone to land

#### Piloting.emergency()

Put drone in emergency user state

#### Piloting.navigateHome(start)

Ask the drone to fly to home

* **start** 1 to start the navigate home, 0 to stop it

#### Piloting.autoTakeOffMode(state)

[NOT USED] Set Drone3 in automatic take off mode

* **state** State of automatic take off mode (1 for autotake off enabled)

#### Piloting.moveBy(obj)

Draft: this command is not implemented yet by the firmware Move the drone to a relative position and rotate heading by a given angle The frame is horizontal and relative to the current drone orientation: - X is front - Y is right - Z is down The movement settings of the device are those set for the autonomous flight.

* **dX** Wanted displacement along the front axis [m]
* **dY** Wanted displacement along the right axis [m]
* **dZ** Wanted displacement along the down axis [m]
* **dPsi** Wanted rotation of heading  [rad]

#### Animations.flip(direction)

Make a flip

* **direction** Direction for the flip

#### Camera.orientation(obj)

Ask the drone to move camera.

* **tilt** Tilt camera consign for the drone (in degree) The value is saturated by the drone. Saturation value is sent by thre drone through CameraSettingsChanged command.
* **pan** Pan camera consign for the drone (in degree) The value is saturated by the drone. Saturation value is sent by thre drone through CameraSettingsChanged command.

#### MediaRecord.picture(mass_storage_id)

@deprecated Take picture

* **mass_storage_id** Mass storage id to take picture

#### MediaRecord.video(obj)

@deprecated Video record

* **record** Command to record video
* **mass_storage_id** Mass storage id to record

#### MediaRecord.pictureV2()

Take picture

#### MediaRecord.videoV2(record)

Video record

* **record** Command to record video

#### PilotingEvent.moveByEnd(obj)

Draft: this command is not implemented yet by the firmware End of relative displacement of the drone The frame is horizontal and relative to the current drone orientation: - X is front - Y is right - Z is down

* **dX** Distance traveled along the front axis [m]
* **dY** Distance traveled along the right axis [m]
* **dZ** Distance traveled along the down axis [m]
* **dPsi** Applied angle on heading  [rad]
* **error** Error to explain the event

#### Network.wifiScan(band)

Launches wifi network scan

* **band** The band(s) : 2.4 Ghz, 5 Ghz, or both

#### Network.wifiAuthChannel()

Controller inquire the list of authorized wifi channels.

#### PilotingSettings.maxAltitude(current)

Set Max Altitude

* **current** Current altitude max in m

#### PilotingSettings.maxTilt(current)

Set Max Tilt

* **current** Current tilt max in degree

#### PilotingSettings.absolutControl(on)

[NOT USED] Enable/Disable absolut control

* **on** 1 to enable, 0 to disable

#### PilotingSettings.maxDistance(value)

Set the distance max of the drone

* **value** Current max distance in meter

#### PilotingSettings.noFlyOverMaxDistance(shouldNotFlyOver)

Indication about how the product handle flying over the max distance limitation

* **shouldNotFlyOver** 1 if the drone can't fly further than max distance, 0 if no limitation on the drone should be done

#### PilotingSettings.setAutonomousFlightMaxHorizontalSpeed(value)

Draft: this command is not implemented yet by the firmware Set the maximum horizontal speed used by the autonomous flight

* **value** maximum horizontal speed [m/s]

#### PilotingSettings.setAutonomousFlightMaxVerticalSpeed(value)

Draft: this command is not implemented yet by the firmware Set the maximum vertical speed used by the autonomous flight

* **value** maximum vertical speed [m/s]

#### PilotingSettings.setAutonomousFlightMaxHorizontalAcceleration(value)

Draft: this command is not implemented yet by the firmware Set the maximum horizontal acceleration used by the autonomous flight

* **value** maximum horizontal acceleration [m/s2]

#### PilotingSettings.setAutonomousFlightMaxVerticalAcceleration(value)

Draft: this command is not implemented yet by the firmware Set the maximum vertical acceleration used by the autonomous flight

* **value** maximum vertical acceleration [m/s2]

#### PilotingSettings.setAutonomousFlightMaxRotationSpeed(value)

Draft: this command is not implemented yet by the firmware Set the maximum yaw rotation speed used by the autonomous flight

* **value** maximum yaw rotation speed [rad/s]

#### PilotingSettingsState.autonomousFlightMaxHorizontalSpeed(value)

Draft: this command is not implemented yet by the firmware Maximum horizontal speed used by the autonomous flight

* **value** maximum horizontal speed [m/s]

#### PilotingSettingsState.autonomousFlightMaxVerticalSpeed(value)

Draft: this command is not implemented yet by the firmware Maximum vertical speed used by the autonomous flight

* **value** maximum vertical speed [m/s]

#### PilotingSettingsState.autonomousFlightMaxHorizontalAcceleration(value)

Draft: this command is not implemented yet by the firmware Maximum horizontal acceleration used by the autonomous flight

* **value** maximum horizontal acceleration [m/s2]

#### PilotingSettingsState.autonomousFlightMaxVerticalAcceleration(value)

Draft: this command is not implemented yet by the firmware Maximum vertical acceleration used by the autonomous flight

* **value** maximum vertical acceleration [m/s2]

#### PilotingSettingsState.autonomousFlightMaxRotationSpeed(value)

Draft: this command is not implemented yet by the firmware Maximum yaw rotation speed used by the autonomous flight

* **value** maximum yaw rotation speed [rad/s]

#### SpeedSettings.maxVerticalSpeed(current)

Set Max Vertical speed

* **current** Current max vertical speed in m/s

#### SpeedSettings.maxRotationSpeed(current)

Set Max Rotation speed

* **current** Current max rotation speed in degree/s

#### SpeedSettings.hullProtection(present)

Presence of hull protection

* **present** 1 if present, 0 if not present

#### SpeedSettings.outdoor(outdoor)

Outdoor property

* **outdoor** 1 if outdoor flight, 0 if indoor flight

#### NetworkSettings.wifiSelection(obj)

Auto-select channel of choosen band

* **type** The type of wifi selection (auto, manual)
* **band** The allowed band(s) : 2.4 Ghz, 5 Ghz, or all
* **channel** The channel (not used in auto mode)

#### SettingsState.p7id(serialID)

Product P7ID

* **serialID** Product P7ID

#### PictureSettings.pictureFormatSelection(type)

The format of the photo

* **type** The type of photo format

#### PictureSettings.autoWhiteBalanceSelection(type)

AutoWhiteBalance mode

* **type** The type auto white balance

#### PictureSettings.expositionSelection(value)

The exposition of the image

* **value** Exposition value (bounds given by ExpositionChanged arg min and max, by default [-3:3])

#### PictureSettings.saturationSelection(value)

The saturation of the image

* **value** Saturation value (bounds given by SaturationChanged arg min and max, by default [-100:100])

#### PictureSettings.timelapseSelection(obj)

Picture taken periodically

* **enabled** 1 if timelapse is enabled, 0 otherwise
* **interval** interval in seconds for taking pictures

#### PictureSettings.videoAutorecordSelection(obj)

Video autorecord

* **enabled** 1 if video autorecord is enabled, 0 otherwise
* **mass_storage_id** Mass storage id to take video

#### MediaStreaming.videoEnable(enable)

Enable/disable video streaming.

* **enable** 1 to enable, 0 to disable.

#### GPSSettings.setHome(obj)

Set home location

* **latitude** Home latitude in decimal degrees
* **longitude** Home longitude in decimal degrees
* **altitude** Home altitude in meters

#### GPSSettings.resetHome()

Reset home location and let the drone make its own home

#### GPSSettings.sendControllerGPS(obj)

send controller GPS location

* **latitude** GPS latitude in decimal degrees
* **longitude** GPS longitude in decimal degrees
* **altitude** GPS altitude in meters
* **horizontalAccuracy** Horizontal Accuracy in meter ; equal -1 if no horizontal Accuracy
* **verticalAccuracy** Vertical Accuracy in meter ; equal -1 if no vertical Accuracy

#### GPSSettings.homeType(type)

Set user preference for the type of the home position. Note that this is only a preference

* **type** The type of the home position

#### GPSSettings.returnHomeDelay(delay)

Set the delay after which the drone will automatically try to return home

* **delay** Delay in second

#### CameraState.orientation(obj)

Camera orientation

* **tilt** Tilt camera consign for the drone [-100;100]
* **pan** Pan camera consign for the drone [-100;100]

#### CameraState.defaultCameraOrientation(obj)

Orientation of the camera center. This is the value to send when we want to center the camera.

* **tilt** Tilt value (in degree)
* **pan** Pan value (in degree)

#### Antiflickering.electricFrequency(frequency)

Electric frequency of the country determined by the position of the controller

* **frequency** Type of the electric frequency

#### Antiflickering.setMode(mode)

Set the anti flickering mode

* **mode** Mode of the anti flickering functionnality

#### PROState.features(features)

Features enabled

* **features** 		  Bitfield representing enabled features. 		  Currently supported bits are: 		  - 0 : 720p streaming 		  - 1 : No interface on SkyController HDMI

#### Network.disconnect()

Signals the remote that the host will disconnect and close its libARNetwork instance (and all threads that use libARNetwork)

#### NetworkEvent.disconnection(cause)

Signals the remote that the host will disconnect and close its libARNetwork instance (and all threads that use libARNetwork)

* **cause** Cause of the disconnection of the product

#### Settings.allSettings()

Get all product settings, the product must send all settings

#### Settings.reset()

Reset all settings

#### Settings.productName(name)

Set Product name

* **name** Product name

#### Settings.country(code)

Set current Country of controller

* **code** Country code with ISO 3166 format

#### Settings.autoCountry(automatic)

Set Auto Country Settings

* **automatic** Boolean : 0 : Manual / 1 : Auto

#### Common.allStates()

Get all product states.

#### Common.currentDate(date)

Set current date of controller

* **date** Date with ISO-8601 format

#### Common.currentTime(time)

Set current time of controller

* **time** Time with ISO-8601 format

#### Common.reboot()

Command to ask reboot to product

#### CommonState.productModel(model)

Inform of the product model. This is used to customize the UI depending on the connected product.

* **model** The Model of the product.

#### CommonState.countryListKnown(obj)

List of the countries known by the device

* **listFlags** List entry attribute Bitfield. 0x01: First: indicate it's the first element of the list.  0x02: Last:  indicate it's the last element of the list. 0x04: Empty: indicate the list is empty (implies First/Last). All other arguments should be ignored.
* **countryCodes** Following of country code with ISO 3166 format, separated by ";". Be careful of the command size allowed by the network used. If necessary, split the list in several commands.

#### OverHeat.switchOff()

@deprecated Switch off the drone when a overheat appeared

#### OverHeat.ventilate()

@deprecated Ventilate the drone when a overheat appeared

#### WifiSettings.outdoorSetting(outdoor)

Send to product if it should use its outdoor wifi config, or indoor

* **outdoor** 1 if it should use outdoor wifi settings, 0 otherwise

#### Mavlink.start(obj)

Start the flight plan

* **filepath** flight plan file path from the mavlink ftp root
* **type** type of the played mavlink file

#### Mavlink.pause()

Pause the flightplan (can be restarted with a start)

#### Mavlink.stop()

Stop the flightplan

#### Calibration.magnetoCalibration(calibrate)

Sent when a calibration of the magnetometer is asked or is aborted

* **calibrate** 1 if the calibration should be started, 0 if it should be aborted

#### CalibrationState.magnetoCalibrationRequiredState(required)

Status of the calibration requirement

* **required** 1 if calibration is required, 0 if current calibration is still valid

#### GPS.controllerPositionForRun(obj)

Set the controller position for a run. This command is used by all non gps products. Watch out, this command cannot be used with BLE products

* **latitude** Controller latitude in decimal degrees
* **longitude** Controller longitude in decimal degrees

#### FlightPlanEvent.startingErrorEvent()

Event of flight plan start error

#### FlightPlanEvent.speedBridleEvent()

Bridle speed of the drone

#### ARLibsVersionsState.controllerLibARCommandsVersion(version)

Controller libARCommands version

* **version** version of libARCommands ("1.2.3.4"format)

#### ARLibsVersionsState.skyControllerLibARCommandsVersion(version)

SkyController libARCommands version

* **version** version of libARCommands ("1.2.3.4"format)

#### ARLibsVersionsState.deviceLibARCommandsVersion(version)

Device libARCommands version

* **version** version of libARCommands ("1.2.3.4"format)

#### Audio.controllerReadyForStreaming(ready)

Tell the firmware whether the controller is ready to start audio streaming.

* **ready** Bit field for TX and RX ready. bit 0 is 1 if controller is ready and wants to receive sound (Drone TX) bit 1 is 1 if controller is ready and wants to send sound (Drone RX)

#### AudioState.audioStreamingRunning(running)

Notify the controller whether the audio streaming is running.

* **running** Bit field for TX and RX running bit 0 is 1 if Drone TX is running bit 1 is 1 if Drone RX is running

#### Headlights.intensity(obj)

Set instensity of lighting LEDs.

* **left** Set the left LED intensity value (0 through 255).
* **right** Set the right LED intensity value (0 through 255).

#### Animations.startAnimation(anim)

Start a paramaterless animation.

* **anim** Animation to start.

#### Animations.stopAnimation(anim)

Stop a running animation.

* **anim** Animation to stop.

#### Animations.stopAllAnimations()

Stop all running animations.

#### AnimationsState.list(obj)

List of animations state.

* **anim** Animation type.
* **state** State of the animation
* **error** Error to explain the state

#### Accessory.config(accessory)

Set the current accessory configuration.

* **accessory** Accessory configuration to set.

#### AccessoryState.accessoryConfigModificationEnabled(enabled)

Possibility to modify the accessory configuration.

* **enabled** 1 if the modification of the accessory Config is enabled, 0 otherwise

#### Charger.setMaxChargeRate(rate)

@deprecated Set the maximum charge rate allowed to charge a battery.

* **rate** The new maximum charge rate.

#### ChargerState.chargingInfo(obj)

Information of the charge.

* **phase** The current charging phase.
* **rate** The charge rate. If phase is DISCHARGING, refers to the last charge.
* **intensity** The charging intensity, in dA. (12dA = 1,2A) ; If phase is DISCHARGING, refers to the last charge. Equals to 0 if not known.
* **fullChargingTime** The full charging time estimated, in minute. If phase is DISCHARGING, refers to the last charge. Equals to 0 if not known.


### Events
#### battery

Emits battery level percentage

#### video

Emits one h.264 video frame

#### ready

Emitted when the drone has successfully connected

#### flying

Emmited when the drone is flying in the air.

#### hovering

Emmited when the drone is hovering in the air.

#### landed

Emmited when the drone has landed on the ground.

#### landing

Emmited when the drone is in the process of landing.

#### takingOff

Emmited when the drone is in the process of taking off.

#### emergency

Emmited when the drone encounters an emergency condition.


### Raw Events
#### PictureStateChanged

@deprecated State of picture recording

#### VideoStateChanged

@deprecated State of video recording

#### PictureStateChangedV2

State of device picture recording changed

#### VideoStateChangedV2

State of device video recording changed

#### PictureEventChanged

Event of picture recording

#### VideoEventChanged

Event of video recording

#### FlatTrimChanged

Drone acknowledges that flat trim was correctly processed

#### FlyingStateChanged

Drone flying state changed

#### AlertStateChanged

Drone alert state changed

#### NavigateHomeStateChanged

Navigating home state

#### PositionChanged

Drone position changed

#### SpeedChanged

Drone speed changed

#### AttitudeChanged

Drone attitude changed

#### AutoTakeOffModeChanged

Status of the drone3 automatic take off mode

#### AltitudeChanged

Drone altitude changed

#### WifiScanListChanged

One scanning result found

#### AllWifiScanChanged

State sent when all scanning result sent

#### WifiAuthChannelListChanged

Notify of an Authorized Channel.

#### AllWifiAuthChannelChanged

Notify the end of the list of Authorized wifi Channel.

#### MaxAltitudeChanged

Max Altitude sent by product

#### MaxTiltChanged

Max tilt sent by product

#### AbsolutControlChanged

Absolut control boolean sent by product

#### MaxDistanceChanged

Max distance sent by the drone

#### NoFlyOverMaxDistanceChanged

Indication about how the product handle flying over the max distance limitation

#### AutonomousFlightMaxHorizontalSpeed

Draft: this command is not implemented yet by the firmware Maximum horizontal speed used by the autonomous flight

#### AutonomousFlightMaxVerticalSpeed

Draft: this command is not implemented yet by the firmware Maximum vertical speed used by the autonomous flight

#### AutonomousFlightMaxHorizontalAcceleration

Draft: this command is not implemented yet by the firmware Maximum horizontal acceleration used by the autonomous flight

#### AutonomousFlightMaxVerticalAcceleration

Draft: this command is not implemented yet by the firmware Maximum vertical acceleration used by the autonomous flight

#### AutonomousFlightMaxRotationSpeed

Draft: this command is not implemented yet by the firmware Maximum yaw rotation speed used by the autonomous flight

#### MaxVerticalSpeedChanged

Max vertical speed sent by product

#### MaxRotationSpeedChanged

Max rotation speed sent by product

#### HullProtectionChanged

Presence of hull protection sent by product

#### OutdoorChanged

Outdoor property sent by product

#### WifiSelectionChanged

Wifi selection from product

#### ProductMotorVersionListChanged

DEPRECATED Product Motor version (the first argument is the unique identifier for the list)

#### ProductGPSVersionChanged

Product GPS versions

#### MotorErrorStateChanged

Motor status changed

#### MotorSoftwareVersionChanged

Motor software version status

#### MotorFlightsStatusChanged

Motor flights status

#### MotorErrorLastErrorChanged

Motor status about last error

#### PictureFormatChanged

The format of the photo

#### AutoWhiteBalanceChanged

AutoWhiteBalance mode

#### ExpositionChanged

The exposition of the image

#### SaturationChanged

The saturation of the image

#### TimelapseChanged

Picture taken periodically

#### VideoAutorecordChanged

Video autorecord

#### VideoEnableChanged

Return video streaming status.

#### HomeChanged

Return home status

#### ResetHomeChanged

Reset home status

#### GPSFixStateChanged

GPS fix state

#### GPSUpdateStateChanged

GPS update state

#### HomeTypeChanged

State of the type of the home position. This type is the user preference. The prefered home type may not be available, see HomeTypeStatesChanged to get the drone home type.

#### ReturnHomeDelayChanged

State of the delay after which the drone will automatically try to return home

#### Orientation

Camera orientation

#### defaultCameraOrientation

Orientation of the camera center. This is the value to send when we want to center the camera.

#### electricFrequencyChanged

Electric frequency of the country determined by the position of the controller

#### modeChanged

Anti flickering mode

#### NumberOfSatelliteChanged

The number of satellite used to compute the gps position

#### HomeTypeAvailabilityChanged

Availability of the return home types in a map : for each type other args will be sent by the drone

#### HomeTypeChosenChanged

The return home type chosen

#### Features

Features enabled 		  	

#### Disconnection

Signals the remote that the host will disconnect and close its libARNetwork instance (and all threads that use libARNetwork)

#### AllSettingsChanged

State sent when all settings has been sent.

#### ResetChanged

State sent when all settings has been resetting.

#### ProductNameChanged

Product name

#### ProductVersionChanged

Product versions

#### ProductSerialHighChanged

Product serial number

#### ProductSerialLowChanged

Product serial number

#### CountryChanged

Inform current Country set in product. (Answer to 'Country' command)

#### AutoCountryChanged

Inform Auto Country Settings

#### AllStates

Get all product states.

#### AllStatesChanged

State sent when all product states has been sent.

#### BatteryStateChanged

Battery state

#### MassStorageStateListChanged

Mass storage state list

#### MassStorageInfoStateListChanged

Mass storage info state list

#### CurrentDateChanged

Current date state

#### CurrentTimeChanged

Current time state

#### MassStorageInfoRemainingListChanged

Mass storage info remaining list

#### WifiSignalChanged

Wifi Signal between controller and product state

#### SensorsStatesListChanged

Sensors states list

#### ProductModel

Inform of the product model. This is used to customize the UI depending on the connected product.

#### CountryListKnown

List of the countries known by the device

#### OverHeatChanged

Overheat temperature reached

#### OverHeatRegulationChanged

Overheat regulation state changed

#### isPilotingChanged

Tell the device when the controller application enters/leaves the piloting HUD.

#### outdoorSettingsChanged

Status of the wifi config : either indoor or outdoor

#### MavlinkFilePlayingStateChanged

Playing state of a mavlink flight plan

#### MavlinkPlayErrorStateChanged

FlightPlan play state error

#### MagnetoCalibrationStateChanged

Sent when the state of the magneto calibration has changed

#### MagnetoCalibrationRequiredState

Status of the calibration requirement

#### MagnetoCalibrationAxisToCalibrateChanged

Event sent by a product to inform about the axis to calibrate

#### MagnetoCalibrationStartedChanged

Status of the calibration process

#### CameraSettingsChanged

Status of the camera settings

#### AvailabilityStateChanged

State of availability to run a flight plan file

#### ComponentStateListChanged

List of state of drone flightPlan components

#### StartingErrorEvent

Event of flight plan start error

#### SpeedBridleEvent

Bridle speed of the drone

#### ControllerLibARCommandsVersion

Controller libARCommands version

#### SkyControllerLibARCommandsVersion

SkyController libARCommands version

#### DeviceLibARCommandsVersion

Device libARCommands version

#### AudioStreamingRunning

Notify the controller whether the audio streaming is running.

#### intensityChanged

Notify the instensity values for headlight LEDs.

#### SupportedAccessoriesListChanged

List of supported accessories

#### AccessoryConfigChanged

Accessory config response.

#### AccessoryConfigModificationEnabled

Possibility to modify the accessory configuration.

#### MaxChargeRateChanged

@deprecated The maximum charge rate reported by the firmware.

#### CurrentChargeStateChanged

@deprecated The charge status of the battery changed.

#### LastChargeRateChanged

@deprecated The charge rate of the last charge sent by the firmware.

#### ChargingInfo

Information of the charge.


## Release History

0.3.0 Add getVideoStream, getMjpegStream, picture taking and video recording methods

0.2.0 Add flip commands, implement ack processes, emit flying state and battery events

0.1.0 Initial release

## License

Copyright (c) 2015 The Hybrid Group. Licensed under the MIT license.
