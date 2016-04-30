## Full Command Set

### Accessory
#### Accessory.config(accessory)

Set the current accessory configuration.

* **accessory** Accessory configuration to set.


### AccessoryState
#### AccessoryState.accessoryConfigModificationEnabled(enabled)

Possibility to modify the accessory configuration.

* **enabled** 1 if the modification of the accessory Config is enabled, 0 otherwise


### Animations
#### Animations.flip(direction)

Make a flip

* **direction** Direction for the flip

#### Animations.startAnimation(anim)

Start a paramaterless animation.

* **anim** Animation to start.

#### Animations.stopAnimation(anim)

Stop a running animation.

* **anim** Animation to stop.

#### Animations.stopAllAnimations()

Stop all running animations.


### AnimationsState
#### AnimationsState.list(obj)

List of animations state.

* **anim** Animation type.
* **state** State of the animation
* **error** Error to explain the state


### Antiflickering
#### Antiflickering.electricFrequency(frequency)

Electric frequency of the country determined by the position of the controller

* **frequency** Type of the electric frequency

#### Antiflickering.setMode(mode)

Set the anti flickering mode

* **mode** Mode of the anti flickering functionnality


### ARLibsVersionsState
#### ARLibsVersionsState.controllerLibARCommandsVersion(version)

Controller libARCommands version

* **version** version of libARCommands ("1.2.3.4"format)

#### ARLibsVersionsState.skyControllerLibARCommandsVersion(version)

SkyController libARCommands version

* **version** version of libARCommands ("1.2.3.4"format)

#### ARLibsVersionsState.deviceLibARCommandsVersion(version)

Device libARCommands version

* **version** version of libARCommands ("1.2.3.4"format)


### Audio
#### Audio.controllerReadyForStreaming(ready)

Tell the firmware whether the controller is ready to start audio streaming.

* **ready** Bit field for TX and RX ready. bit 0 is 1 if controller is ready and wants to receive sound (Drone TX) bit 1 is 1 if controller is ready and wants to send sound (Drone RX)


### AudioState
#### AudioState.audioStreamingRunning(running)

Notify the controller whether the audio streaming is running.

* **running** Bit field for TX and RX running bit 0 is 1 if Drone TX is running bit 1 is 1 if Drone RX is running


### Calibration
#### Calibration.magnetoCalibration(calibrate)

Sent when a calibration of the magnetometer is asked or is aborted

* **calibrate** 1 if the calibration should be started, 0 if it should be aborted


### CalibrationState
#### CalibrationState.magnetoCalibrationRequiredState(required)

Status of the calibration requirement

* **required** 1 if calibration is required, 0 if current calibration is still valid


### Camera
#### Camera.orientation(tilt, pan)

Ask the drone to move camera.

* **tilt** Tilt camera consign for the drone (in degree) The value is saturated by the drone. Saturation value is sent by thre drone through CameraSettingsChanged command.
* **pan** Pan camera consign for the drone (in degree) The value is saturated by the drone. Saturation value is sent by thre drone through CameraSettingsChanged command.


### CameraState
#### CameraState.orientation(tilt, pan)

Camera orientation

* **tilt** Tilt camera consign for the drone [-100;100]
* **pan** Pan camera consign for the drone [-100;100]

#### CameraState.defaultCameraOrientation(tilt, pan)

Orientation of the camera center. This is the value to send when we want to center the camera.

* **tilt** Tilt value (in degree)
* **pan** Pan value (in degree)


### Charger
#### Charger.setMaxChargeRate(rate)

@deprecated Set the maximum charge rate allowed to charge a battery.

* **rate** The new maximum charge rate.


### ChargerState
#### ChargerState.chargingInfo(obj)

Information of the charge.

* **phase** The current charging phase.
* **rate** The charge rate. If phase is DISCHARGING, refers to the last charge.
* **intensity** The charging intensity, in dA. (12dA = 1,2A) ; If phase is DISCHARGING, refers to the last charge. Equals to 0 if not known.
* **fullChargingTime** The full charging time estimated, in minute. If phase is DISCHARGING, refers to the last charge. Equals to 0 if not known.


### Common
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


### CommonState
#### CommonState.productModel(model)

Inform of the product model. This is used to customize the UI depending on the connected product.

* **model** The Model of the product.

#### CommonState.countryListKnown(obj)

List of the countries known by the device

* **listFlags** List entry attribute Bitfield. 0x01: First: indicate it's the first element of the list.  0x02: Last:  indicate it's the last element of the list. 0x04: Empty: indicate the list is empty (implies First/Last). All other arguments should be ignored.
* **countryCodes** Following of country code with ISO 3166 format, separated by ";". Be careful of the command size allowed by the network used. If necessary, split the list in several commands.


### FlightPlanEvent
#### FlightPlanEvent.startingErrorEvent()

Event of flight plan start error

#### FlightPlanEvent.speedBridleEvent()

Bridle speed of the drone


### GPS
#### GPS.controllerPositionForRun(obj)

Set the controller position for a run. This command is used by all non gps products. Watch out, this command cannot be used with BLE products

* **latitude** Controller latitude in decimal degrees
* **longitude** Controller longitude in decimal degrees


### GPSSettings
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


### Headlights
#### Headlights.intensity(obj)

Set instensity of lighting LEDs.

* **left** Set the left LED intensity value (0 through 255).
* **right** Set the right LED intensity value (0 through 255).


### Mavlink
#### Mavlink.start(obj)

Start the flight plan

* **filepath** flight plan file path from the mavlink ftp root
* **type** type of the played mavlink file

#### Mavlink.pause()

Pause the flightplan (can be restarted with a start)

#### Mavlink.stop()

Stop the flightplan


### MediaRecord
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


### MediaStreaming
#### MediaStreaming.videoEnable(enable)

Enable/disable video streaming.

* **enable** 1 to enable, 0 to disable.


### Network
#### Network.wifiScan(band)

Launches wifi network scan

* **band** The band(s) : 2.4 Ghz, 5 Ghz, or both

#### Network.wifiAuthChannel()

Controller inquire the list of authorized wifi channels.

#### Network.disconnect()

Signals the remote that the host will disconnect and close its libARNetwork instance (and all threads that use libARNetwork)


### NetworkEvent
#### NetworkEvent.disconnection(cause)

Signals the remote that the host will disconnect and close its libARNetwork instance (and all threads that use libARNetwork)

* **cause** Cause of the disconnection of the product


### NetworkSettings
#### NetworkSettings.wifiSelection(obj)

Auto-select channel of choosen band

* **type** The type of wifi selection (auto, manual)
* **band** The allowed band(s) : 2.4 Ghz, 5 Ghz, or all
* **channel** The channel (not used in auto mode)


### OverHeat
#### OverHeat.switchOff()

@deprecated Switch off the drone when a overheat appeared

#### OverHeat.ventilate()

@deprecated Ventilate the drone when a overheat appeared


### PictureSettings
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

#### PictureSettings.timelapseSelection(enabled, interval)

Picture taken periodically

* **enabled** 1 if timelapse is enabled, 0 otherwise
* **interval** interval in seconds for taking pictures

#### PictureSettings.videoAutorecordSelection(enabled, massStorageId)

Video autorecord

* **enabled** 1 if video autorecord is enabled, 0 otherwise
* **mass_storage_id** Mass storage id to take video

#### PictureSettings.videoStabilizationMode(mode)

Video stabilization mode

* **mode** enum for mode


### Piloting
#### Piloting.flatTrim()

Do a flat trim

#### Piloting.takeOff()

Ask the drone to take off

#### Piloting.pcmd(flag, roll, pitch, yaw, gaz, timestampAndSeqNum)

Ask the drone to move around.

* **flag** Boolean flag to activate roll/pitch movement
* **roll** Roll consign for the drone [-100;100]
* **pitch** Pitch consign for the drone [-100;100]
* **yaw** Yaw consign for the drone [-100;100]
* **gaz** Gaz consign for the drone [-100;100]
* **timestampAndSeqNum** Not sure on this, please check Parrot docs

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

#### Piloting.userTakeOff(state)

Not sure, check Parrot docs

* **state** State of user takeoff

#### Piloting.circle(direction)

Start circling, must apply to fixed wing drones?

* **direction** 0 for CW, 1, for CCW


### PilotingEvent
#### PilotingEvent.moveByEnd(obj)

Draft: this command is not implemented yet by the firmware End of relative displacement of the drone The frame is horizontal and relative to the current drone orientation: - X is front - Y is right - Z is down

* **dX** Distance traveled along the front axis [m]
* **dY** Distance traveled along the right axis [m]
* **dZ** Distance traveled along the down axis [m]
* **dPsi** Applied angle on heading  [rad]
* **error** Error to explain the event


### PilotingSettings
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

#### PilotingSettings.minAltitude(current)

Set Min Altitude

* **current** Current altitude min in m

#### PilotingSettings.circlingDirection(value)

Direction to circle in

* **value** direction

#### PilotingSettings.circlingRadius(value)

Set radius for circling

* **value** radius in m

#### PilotingSettings.circlingAltitude(value)

Set altitude for circling

* **value** Current altitude min in m

#### PilotingSettings.pitchMode(value)

Set pitch mode

* **value** mode

#### PilotingSettings.landingMode(value)

Set landing mode

* **value** mode


### PilotingSettingsState
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

#### PilotingSettingsState.bankedTurn(value)

Enable/disable banked turn

* **value** enable/disable


### PROState
#### PROState.features(features)

Features enabled

* **features** 		  Bitfield representing enabled features. 		  Currently supported bits are: 		  - 0 : 720p streaming 		  - 1 : No interface on SkyController HDMI


### Settings
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


### SettingsState
#### SettingsState.p7id(serialID)

Product P7ID

* **serialID** Product P7ID


### SpeedSettings
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


### WifiSettings
#### WifiSettings.outdoorSetting(outdoor)

Send to product if it should use its outdoor wifi config, or indoor

* **outdoor** 1 if it should use outdoor wifi settings, 0 otherwise
