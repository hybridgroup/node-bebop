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
