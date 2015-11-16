"use strict";

module.exports = [
  {
    "class": [
      {
        "cmd": [
          {
            "_name": "FlatTrim",
            "__text": "Do a flat trim"
                    },
          {
            "_name": "TakeOff",
            "__text": "Ask the drone to take off"
                    },
          {
            "arg": [
              {
                "_name": "flag",
                "_type": "u8",
                "__text": "Boolean flag to activate roll/pitch movement"
                            },
              {
                "_name": "roll",
                "_type": "i8",
                "__text": "Roll consign for the drone [-100;100]"
                            },
              {
                "_name": "pitch",
                "_type": "i8",
                "__text": "Pitch consign for the drone [-100;100]"
                            },
              {
                "_name": "yaw",
                "_type": "i8",
                "__text": "Yaw consign for the drone [-100;100]"
                            },
              {
                "_name": "gaz",
                "_type": "i8",
                "__text": "Gaz consign for the drone [-100;100]"
                            },
              {
                "_name": "psi",
                "_type": "float",
                "__text": "[NOT USED] - Magnetic north heading of the "
                + "controlling device (deg) [-180;180]"
                            }
                        ],
            "_name": "PCMD",
            "_buffer": "NON_ACK",
            "__text": "Ask the drone to move around."
                    },
          {
            "_name": "Landing",
            "__text": "Ask the drone to land"
                    },
          {
            "_name": "Emergency",
            "_buffer": "HIGH_PRIO",
            "_timeout": "RETRY",
            "__text": "Put drone in emergency user state"
                    },
          {
            "arg": {
              "_name": "start",
              "_type": "u8",
              "__text": "1 to start the navigate home, 0 to stop it"
            },
            "_name": "NavigateHome",
            "__text": "Ask the drone to fly to home"
                    },
          {
            "arg": {
              "_name": "state",
              "_type": "u8",
              "__text": "State of automatic take off mode (1 for autotake"
                + " off enabled)"
            },
            "_name": "AutoTakeOffMode",
            "__text": "[NOT USED] Set Drone3 in automatic take off mode"
                    },
          {
            "arg": [
              {
                "_name": "dX",
                "_type": "float",
                "__text": "Wanted displacement along the front axis [m]"
                            },
              {
                "_name": "dY",
                "_type": "float",
                "__text": "Wanted displacement along the right axis [m]"
                            },
              {
                "_name": "dZ",
                "_type": "float",
                "__text": "Wanted displacement along the down axis [m]"
                            },
              {
                "_name": "dPsi",
                "_type": "float",
                "__text": "Wanted rotation of heading  [rad]"
                            }
                        ],
            "_name": "moveBy",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Move the drone to a relative position "
                + "and rotate heading by a given angle The frame is "
                + "horizontal and relative to the current drone "
                + "orientation: - X is front - Y is right - Z is "
                + "down The movement settings of the device are "
                + "those set for the autonomous flight."
                    }
                ],
        "_name": "Piloting",
        "_id": "0",
        "__text": "All commands related to piloting the totoDrone"
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "front",
                "__text": "Flip direction front"
                            },
              {
                "_name": "back",
                "__text": "Flip direction back"
                            },
              {
                "_name": "right",
                "__text": "Flip direction right"
                            },
              {
                "_name": "left",
                "__text": "Flip direction left"
                            }
                        ],
            "_name": "direction",
            "_type": "enum",
            "__text": "Direction for the flip"
          },
          "_name": "Flip",
          "__text": "Make a flip"
        },
        "_name": "Animations",
        "_id": "5",
        "__text": "Animation commands"
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "tilt",
              "_type": "i8",
              "__text": "Tilt camera consign for the drone (in degree)"
                + " The value is saturated by the drone. Saturation "
                + "value is sent by thre drone through CameraSettingsChanged"
                + " command."
                        },
            {
              "_name": "pan",
              "_type": "i8",
              "__text": "Pan camera consign for the drone (in degree)"
                + " The value is saturated by the drone. Saturation "
                + "value is sent by thre drone through CameraSettingsChanged"
                + " command."
                        }
                    ],
          "_name": "Orientation",
          "__text": "Ask the drone to move camera."
        },
        "_name": "Camera",
        "_id": "1",
        "__text": "Ask the drone to move camera"
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "mass_storage_id",
              "_type": "u8",
              "__text": "Mass storage id to take picture"
            },
            "_name": "Picture",
            "__text": "@deprecated Take picture"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "stop",
                    "__text": "Stop the video recording"
                                    },
                  {
                    "_name": "start",
                    "__text": "Start the video recording"
                                    }
                                ],
                "_name": "record",
                "_type": "enum",
                "__text": "Command to record video"
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage id to record"
                            }
                        ],
            "_name": "Video",
            "__text": "@deprecated Video record"
                    },
          {
            "_name": "PictureV2",
            "__text": "Take picture"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "stop",
                  "__text": "Stop the video recording"
                                },
                {
                  "_name": "start",
                  "__text": "Start the video recording"
                                }
                            ],
              "_name": "record",
              "_type": "enum",
              "__text": "Command to record video"
            },
            "_name": "VideoV2",
            "__text": "Video record"
                    }
                ],
        "_name": "MediaRecord",
        "_id": "7",
        "__text": "Media recording management"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "state",
                "_type": "u8",
                "__text": "1 if picture has been taken, 0 otherwise"
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage id where the picture was recorded"
                            }
                        ],
            "_name": "PictureStateChanged",
            "__text": "@deprecated State of picture recording"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "stopped",
                    "__text": "Video was stopped"
                                    },
                  {
                    "_name": "started",
                    "__text": "Video was started"
                                    },
                  {
                    "_name": "failed",
                    "__text": "Video was failed"
                                    },
                  {
                    "_name": "autostopped",
                    "__text": "Video was auto stopped"
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "State of video"
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage id where the video was recorded"
                            }
                        ],
            "_name": "VideoStateChanged",
            "__text": "@deprecated State of video recording"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "ready",
                    "__text": "The picture recording is ready"
                                    },
                  {
                    "_name": "busy",
                    "__text": "The picture recording is busy"
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "The picture recording is not available"
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "State of device picture recording"
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "No Error"
                                    },
                  {
                    "_name": "unknown",
                    "__text": "Unknown generic error"
                                    },
                  {
                    "_name": "camera_ko",
                    "__text": "Picture camera is out of order"
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "Memory full ; cannot save one additional picture"
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "Battery is too low to start/keep recording."
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "Error to explain the state"
                            }
                        ],
            "_name": "PictureStateChangedV2",
            "__text": "State of device picture recording changed"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "stopped",
                    "__text": "Video is stopped"
                                    },
                  {
                    "_name": "started",
                    "__text": "Video is started"
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "The video recording is not available"
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "State of device video recording"
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "No Error"
                                    },
                  {
                    "_name": "unknown",
                    "__text": "Unknown generic error"
                                    },
                  {
                    "_name": "camera_ko",
                    "__text": "Video camera is out of order"
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "Memory full ; cannot save one additional video"
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "Battery is too low to start/keep recording."
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "Error to explain the state"
                            }
                        ],
            "_name": "VideoStateChangedV2",
            "__text": "State of device video recording changed"
                    }
                ],
        "_name": "MediaRecordState",
        "_id": "8",
        "__text": "State of media recording"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "taken",
                    "__text": "Picture taken and saved"
                                    },
                  {
                    "_name": "failed",
                    "__text": "Picture failed"
                                    }
                                ],
                "_name": "event",
                "_type": "enum",
                "__text": "Last event of picture recording"
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "No Error"
                                    },
                  {
                    "_name": "unknown",
                    "__text": "Unknown generic error ; "
                + "only when state is failed"
                                    },
                  {
                    "_name": "busy",
                    "__text": "Picture recording is busy ; "
                + "only when state is failed"
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "Picture recording not available ; "
                + "only when state is failed"
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "Memory full ; only when state is failed"
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "Battery is too low to record."
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "Error to explain the event"
                            }
                        ],
            "_name": "PictureEventChanged",
            "__text": "Event of picture recording"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "start",
                    "__text": "Video start"
                                    },
                  {
                    "_name": "stop",
                    "__text": "Video stop and saved"
                                    },
                  {
                    "_name": "failed",
                    "__text": "Video failed"
                                    }
                                ],
                "_name": "event",
                "_type": "enum",
                "__text": "Event of video recording"
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "No Error"
                                    },
                  {
                    "_name": "unknown",
                    "__text": "Unknown generic error ; "
                + "only when state is failed"
                                    },
                  {
                    "_name": "busy",
                    "__text": "Video recording is busy ;"
                + " only when state is failed"
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "Video recording not available ;"
                + " only when state is failed"
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "Memory full"
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "Battery is too low to record."
                                    },
                  {
                    "_name": "autoStopped",
                    "__text": "Video was auto stopped"
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "Error to explain the event"
                            }
                        ],
            "_name": "VideoEventChanged",
            "__text": "Event of video recording"
                    }
                ],
        "_name": "MediaRecordEvent",
        "_id": "3",
        "__text": "Events of media recording"
            },
      {
        "cmd": [
          {
            "_name": "FlatTrimChanged",
            "__text": "Drone acknowledges that flat trim was"
                + " correctly processed"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "landed",
                  "__text": "Landed state"
                                },
                {
                  "_name": "takingoff",
                  "__text": "Taking off state"
                                },
                {
                  "_name": "hovering",
                  "__text": "Hovering state"
                                },
                {
                  "_name": "flying",
                  "__text": "Flying state"
                                },
                {
                  "_name": "landing",
                  "__text": "Landing state"
                                },
                {
                  "_name": "emergency",
                  "__text": "Emergency state"
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "Drone flying state"
            },
            "_name": "FlyingStateChanged",
            "__text": "Drone flying state changed"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "none",
                  "__text": "No alert"
                                },
                {
                  "_name": "user",
                  "__text": "User emergency alert"
                                },
                {
                  "_name": "cut_out",
                  "__text": "Cut out alert"
                                },
                {
                  "_name": "critical_battery",
                  "__text": "Critical battery alert"
                                },
                {
                  "_name": "low_battery",
                  "__text": "Low battery alert"
                                },
                {
                  "_name": "too_much_angle",
                  "__text": "The angle of the drone is too high"
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "Drone alert state"
            },
            "_name": "AlertStateChanged",
            "__text": "Drone alert state changed"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "available",
                    "__text": "Navigate home is available"
                                    },
                  {
                    "_name": "inProgress",
                    "__text": "Navigate home is in progress"
                                    },
                  {
                    "_name": "unavailable",
                    "__text": "Navigate home is not available"
                                    },
                  {
                    "_name": "pending",
                    "__text": "Navigate home has been received,"
                + " but its process is pending"
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "State of navigate home"
                            },
              {
                "enum": [
                  {
                    "_name": "userRequest",
                    "__text": "User requested a navigate home "
                + "(available->inProgress)"
                                    },
                  {
                    "_name": "connectionLost",
                    "__text": "Connection between controller and product lost"
                + " (available->inProgress)"
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "Low battery occurred (available->inProgress)"
                                    },
                  {
                    "_name": "finished",
                    "__text": "Navigate home is finished "
                + "(inProgress->available)"
                                    },
                  {
                    "_name": "stopped",
                    "__text": "Navigate home has been stopped "
                + "(inProgress->available)"
                                    },
                  {
                    "_name": "disabled",
                    "__text": "Navigate home disabled by product "
                + "(inProgress->unavailable or available->unavailable)"
                                    },
                  {
                    "_name": "enabled",
                    "__text": "Navigate home enabled by product "
                + "(unavailable->available)"
                                    }
                                ],
                "_name": "reason",
                "_type": "enum",
                "__text": "Reason of the state"
                            }
                        ],
            "_name": "NavigateHomeStateChanged",
            "__text": "Navigating home state"
                    },
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "Latitude position in decimal degrees "
                + "(500.0 if not available)"
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "Longitude position in decimal degrees "
                + "(500.0 if not available)"
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "Altitude in meters (from GPS)"
                            }
                        ],
            "_name": "PositionChanged",
            "__text": "Drone position changed"
                    },
          {
            "arg": [
              {
                "_name": "speedX",
                "_type": "float",
                "__text": "Speed on the x axis (when drone moves "
                + "forward, speed is > 0) (in m/s)"
                            },
              {
                "_name": "speedY",
                "_type": "float",
                "__text": "Speed on the y axis (when drone moves to "
                + "right, speed is > 0) (in m/s)"
                            },
              {
                "_name": "speedZ",
                "_type": "float",
                "__text": "Speed on the z axis (when drone moves down,"
                + " speed is > 0) (in m/s)"
                            }
                        ],
            "_name": "SpeedChanged",
            "__text": "Drone speed changed"
                    },
          {
            "arg": [
              {
                "_name": "roll",
                "_type": "float",
                "__text": "roll value (in radian)"
                            },
              {
                "_name": "pitch",
                "_type": "float",
                "__text": "Pitch value (in radian)"
                            },
              {
                "_name": "yaw",
                "_type": "float",
                "__text": "Yaw value (in radian)"
                            }
                        ],
            "_name": "AttitudeChanged",
            "__text": "Drone attitude changed"
                    },
          {
            "arg": {
              "_name": "state",
              "_type": "u8",
              "__text": "State of automatic take off mode (1 if enabled)"
            },
            "_name": "AutoTakeOffModeChanged",
            "__text": "Status of the drone3 automatic take off mode"
                    },
          {
            "arg": {
              "_name": "altitude",
              "_type": "double",
              "__text": "Altitude in meters"
            },
            "_name": "AltitudeChanged",
            "__text": "Drone altitude changed"
                    }
                ],
        "_name": "PilotingState",
        "_id": "4",
        "__text": "State from drone"
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "dX",
              "_type": "float",
              "__text": "Distance traveled along the front axis [m]"
                        },
            {
              "_name": "dY",
              "_type": "float",
              "__text": "Distance traveled along the right axis [m]"
                        },
            {
              "_name": "dZ",
              "_type": "float",
              "__text": "Distance traveled along the down axis [m]"
                        },
            {
              "_name": "dPsi",
              "_type": "float",
              "__text": "Applied angle on heading  [rad]"
                        },
            {
              "enum": [
                {
                  "_name": "ok",
                  "__text": "No Error ; The relative displacement"
                                },
                {
                  "_name": "unknown",
                  "__text": "Unknown generic error"
                                },
                {
                  "_name": "busy",
                  "__text": "The Device is busy ; command moveBy ignored"
                                },
                {
                  "_name": "notAvailable",
                  "__text": "Command moveBy is not available ; command"
                + " moveBy ignored"
                                },
                {
                  "_name": "interrupted",
                  "__text": "Command moveBy interrupted"
                                }
                            ],
              "_name": "error",
              "_type": "enum",
              "__text": "Error to explain the event"
                        }
                    ],
          "_name": "moveByEnd",
          "__text": "Draft: this command is not implemented yet by the"
                + " firmware End of relative displacement of the drone"
                + " The frame is horizontal and relative to the current"
                + " drone orientation: - X is front - Y is right - Z is down"
        },
        "_name": "PilotingEvent",
        "_id": "34",
        "__text": "Events of Piloting"
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "2_4ghz",
                  "__text": "2.4 GHz band"
                                },
                {
                  "_name": "5ghz",
                  "__text": "5 GHz band"
                                },
                {
                  "_name": "all",
                  "__text": "Both 2.4 and 5 GHz bands"
                                }
                            ],
              "_name": "band",
              "_type": "enum",
              "__text": "The band(s) : 2.4 Ghz, 5 Ghz, or both"
            },
            "_name": "WifiScan",
            "__text": "Launches wifi network scan"
                    },
          {
            "_name": "WifiAuthChannel",
            "__text": "Controller inquire the list of authorized wifi channels."
                    }
                ],
        "_name": "Network",
        "_id": "13",
        "__text": "Network related commands"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "ssid",
                "_type": "string",
                "__text": "SSID of the AP"
                            },
              {
                "_name": "rssi",
                "_type": "i16",
                "__text": "RSSI of the AP in dbm (negative value)"
                            },
              {
                "enum": [
                  {
                    "_name": "2_4ghz",
                    "__text": "2.4 GHz band"
                                    },
                  {
                    "_name": "5ghz",
                    "__text": "5 GHz band"
                                    }
                                ],
                "_name": "band",
                "_type": "enum",
                "__text": "The band : 2.4 GHz or 5 GHz"
                            },
              {
                "_name": "channel",
                "_type": "u8",
                "__text": "Channel of the AP"
                            }
                        ],
            "_name": "WifiScanListChanged",
            "_listtype": "MAP",
            "__text": "One scanning result found"
                    },
          {
            "_name": "AllWifiScanChanged",
            "__text": "State sent when all scanning result sent"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "2_4ghz",
                    "__text": "2.4 GHz band"
                                    },
                  {
                    "_name": "5ghz",
                    "__text": "5 GHz band"
                                    }
                                ],
                "_name": "band",
                "_type": "enum",
                "__text": "The band of this channel : 2.4 GHz or 5 GHz"
                            },
              {
                "_name": "channel",
                "_type": "u8",
                "__text": "The authorized channel."
                            },
              {
                "_name": "in_or_out",
                "_type": "u8",
                "__text": "Bit 0 is 1 if channel is authorized outside "
                + "(0 otherwise) ; Bit 1 is 1 if channel is authorized"
                + " inside (0 otherwise)"
                            }
                        ],
            "_name": "WifiAuthChannelListChanged",
            "_listtype": "LIST",
            "__text": "Notify of an Authorized Channel."
                    },
          {
            "_name": "AllWifiAuthChannelChanged",
            "__text": "Notify the end of the list of Authorized wifi Channel."
                    }
                ],
        "_name": "NetworkState",
        "_id": "14",
        "__text": "Network state from Product"
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "Current altitude max in m"
            },
            "_name": "MaxAltitude",
            "__text": "Set Max Altitude"
                    },
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "Current tilt max in degree"
            },
            "_name": "MaxTilt",
            "__text": "Set Max Tilt"
                    },
          {
            "arg": {
              "_name": "on",
              "_type": "u8",
              "__text": "1 to enable, 0 to disable"
            },
            "_name": "AbsolutControl",
            "__text": "[NOT USED] Enable/Disable absolut control"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "Current max distance in meter"
            },
            "_name": "MaxDistance",
            "__text": "Set the distance max of the drone"
                    },
          {
            "arg": {
              "_name": "shouldNotFlyOver",
              "_type": "u8",
              "__text": "1 if the drone can't fly further than max "
                + "distance, 0 if no limitation on the drone should be done"
            },
            "_name": "NoFlyOverMaxDistance",
            "__text": "Indication about how the product handle flying "
                + "over the max distance limitation"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum horizontal speed [m/s]"
            },
            "_name": "setAutonomousFlightMaxHorizontalSpeed",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Set the maximum horizontal speed used by "
                + "the autonomous flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum vertical speed [m/s]"
            },
            "_name": "setAutonomousFlightMaxVerticalSpeed",
            "__text": "Draft: this command is not implemented yet by the "
                + "firmware Set the maximum vertical speed used by the"
                + " autonomous flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum horizontal acceleration [m/s2]"
            },
            "_name": "setAutonomousFlightMaxHorizontalAcceleration",
            "__text": "Draft: this command is not implemented yet by the "
                + "firmware Set the maximum horizontal acceleration used"
                + " by the autonomous flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum vertical acceleration [m/s2]"
            },
            "_name": "setAutonomousFlightMaxVerticalAcceleration",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Set the maximum vertical acceleration used"
                + " by the autonomous flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum yaw rotation speed [rad/s]"
            },
            "_name": "setAutonomousFlightMaxRotationSpeed",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Set the maximum yaw rotation speed used by"
                + " the autonomous flight"
                    }
                ],
        "_name": "PilotingSettings",
        "_id": "2",
        "__text": "Piloting Settings commands"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "Current altitude max"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Range min of altitude"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Range max of altitude"
                            }
                        ],
            "_name": "MaxAltitudeChanged",
            "__text": "Max Altitude sent by product"
                    },
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "Current max tilt"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Range min of tilt"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Range max of tilt"
                            }
                        ],
            "_name": "MaxTiltChanged",
            "__text": "Max tilt sent by product"
                    },
          {
            "arg": {
              "_name": "on",
              "_type": "u8",
              "__text": "1 if enabled, 0 if disabled"
            },
            "_name": "AbsolutControlChanged",
            "__text": "Absolut control boolean sent by product"
                    },
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "Current max distance in meter"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Minimal possible max distance"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Maximal possible max distance"
                            }
                        ],
            "_name": "MaxDistanceChanged",
            "__text": "Max distance sent by the drone"
                    },
          {
            "arg": {
              "_name": "shouldNotFlyOver",
              "_type": "u8",
              "__text": "1 if the drone won't fly further than max distance,"
                + " 0 if no limitation on the drone will be done"
            },
            "_name": "NoFlyOverMaxDistanceChanged",
            "__text": "Indication about how the product handle flying over"
                + " the max distance limitation"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum horizontal speed [m/s]"
            },
            "_name": "AutonomousFlightMaxHorizontalSpeed",
            "__text": "Draft: this command is not implemented yet by the "
                + "firmware Maximum horizontal speed used by the autonomous"
                + " flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum vertical speed [m/s]"
            },
            "_name": "AutonomousFlightMaxVerticalSpeed",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Maximum vertical speed used by the autonomous"
                + " flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum horizontal acceleration [m/s2]"
            },
            "_name": "AutonomousFlightMaxHorizontalAcceleration",
            "__text": "Draft: this command is not implemented yet by the "
                + "firmware Maximum horizontal acceleration used by the"
                + " autonomous flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum vertical acceleration [m/s2]"
            },
            "_name": "AutonomousFlightMaxVerticalAcceleration",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Maximum vertical acceleration used by the"
                + " autonomous flight"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "maximum yaw rotation speed [rad/s]"
            },
            "_name": "AutonomousFlightMaxRotationSpeed",
            "__text": "Draft: this command is not implemented yet by the"
                + " firmware Maximum yaw rotation speed used by the "
                + "autonomous flight"
                    }
                ],
        "_name": "PilotingSettingsState",
        "_id": "6",
        "__text": "Piloting Settings state from product"
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "Current max vertical speed in m/s"
            },
            "_name": "MaxVerticalSpeed",
            "__text": "Set Max Vertical speed"
                    },
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "Current max rotation speed in degree/s"
            },
            "_name": "MaxRotationSpeed",
            "__text": "Set Max Rotation speed"
                    },
          {
            "arg": {
              "_name": "present",
              "_type": "u8",
              "__text": "1 if present, 0 if not present"
            },
            "_name": "HullProtection",
            "__text": "Presence of hull protection"
                    },
          {
            "arg": {
              "_name": "outdoor",
              "_type": "u8",
              "__text": "1 if outdoor flight, 0 if indoor flight"
            },
            "_name": "Outdoor",
            "__text": "Outdoor property"
                    }
                ],
        "_name": "SpeedSettings",
        "_id": "11",
        "__text": "Speed Settings commands"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "Current max vertical speed in m/s"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Range min of vertical speed"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Range max of vertical speed"
                            }
                        ],
            "_name": "MaxVerticalSpeedChanged",
            "__text": "Max vertical speed sent by product"
                    },
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "Current max rotation speed in degree/s"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Range min of rotation speed"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Range max of rotation speed"
                            }
                        ],
            "_name": "MaxRotationSpeedChanged",
            "__text": "Max rotation speed sent by product"
                    },
          {
            "arg": {
              "_name": "present",
              "_type": "u8",
              "__text": "1 if present, 0 if not present"
            },
            "_name": "HullProtectionChanged",
            "__text": "Presence of hull protection sent by product"
                    },
          {
            "arg": {
              "_name": "outdoor",
              "_type": "u8",
              "__text": "1 if outdoor flight, 0 if indoor flight"
            },
            "_name": "OutdoorChanged",
            "__text": "Outdoor property sent by product"
                    }
                ],
        "_name": "SpeedSettingsState",
        "_id": "12",
        "__text": "Speed Settings state from product"
            },
      {
        "cmd": {
          "arg": [
            {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "Auto selection"
                                },
                {
                  "_name": "manual",
                  "__text": "Manual selection"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of wifi selection (auto, manual)"
                        },
            {
              "enum": [
                {
                  "_name": "2_4ghz",
                  "__text": "2.4 GHz band"
                                },
                {
                  "_name": "5ghz",
                  "__text": "5 GHz band"
                                },
                {
                  "_name": "all",
                  "__text": "Both 2.4 and 5 GHz bands"
                                }
                            ],
              "_name": "band",
              "_type": "enum",
              "__text": "The allowed band(s) : 2.4 Ghz, 5 Ghz, or all"
                        },
            {
              "_name": "channel",
              "_type": "u8",
              "__text": "The channel (not used in auto mode)"
                        }
                    ],
          "_name": "WifiSelection",
          "__text": "Auto-select channel of choosen band"
        },
        "_name": "NetworkSettings",
        "_id": "9",
        "__text": "Network settings commands"
            },
      {
        "cmd": {
          "arg": [
            {
              "enum": [
                {
                  "_name": "auto_all",
                  "__text": "Auto selection"
                                },
                {
                  "_name": "auto_2_4ghz",
                  "__text": "Auto selection 2.4ghz"
                                },
                {
                  "_name": "auto_5ghz",
                  "__text": "Auto selection 5 ghz"
                                },
                {
                  "_name": "manual",
                  "__text": "Manual selection"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of wifi selection settings"
                        },
            {
              "enum": [
                {
                  "_name": "2_4ghz",
                  "__text": "2.4 GHz band"
                                },
                {
                  "_name": "5ghz",
                  "__text": "5 GHz band"
                                },
                {
                  "_name": "all",
                  "__text": "Both 2.4 and 5 GHz bands"
                                }
                            ],
              "_name": "band",
              "_type": "enum",
              "__text": "The actual  wifi band state"
                        },
            {
              "_name": "channel",
              "_type": "u8",
              "__text": "The channel (depends of the band)"
                        }
                    ],
          "_name": "WifiSelectionChanged",
          "__text": "Wifi selection from product"
        },
        "_name": "NetworkSettingsState",
        "_id": "10",
        "__text": "Network settings state from product"
            },
      {
        "_name": "Settings",
        "_id": "15",
        "__text": "Settings commands"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "motor_number",
                "_type": "u8",
                "__text": "Product Motor number"
                            },
              {
                "_name": "type",
                "_type": "string",
                "__text": "Product Motor type"
                            },
              {
                "_name": "software",
                "_type": "string",
                "__text": "Product Motors software version"
                            },
              {
                "_name": "hardware",
                "_type": "string",
                "__text": "Product Motors hardware version"
                            }
                        ],
            "_name": "ProductMotorVersionListChanged",
            "_listtype": "MAP",
            "__text": "DEPRECATED Product Motor version (the first "
                + "argument is the unique identifier for the list)"
                    },
          {
            "arg": [
              {
                "_name": "software",
                "_type": "string",
                "__text": "Product GPS software version"
                            },
              {
                "_name": "hardware",
                "_type": "string",
                "__text": "Product GPS hardware version"
                            }
                        ],
            "_name": "ProductGPSVersionChanged",
            "__text": "Product GPS versions"
                    },
          {
            "arg": [
              {
                "_name": "motorIds",
                "_type": "u8",
                "__text": "Bit field for concerned motor. If bit 0 = 1,"
                + " motor 1 is affected by this error. Same with bit "
                + "1, 2 and 3."
                            },
              {
                "enum": [
                  {
                    "_name": "noError",
                    "__text": "No error detected"
                                    },
                  {
                    "_name": "errorEEPRom",
                    "__text": "EEPROM access failure"
                                    },
                  {
                    "_name": "errorMotorStalled",
                    "__text": "Motor stalled"
                                    },
                  {
                    "_name": "errorPropellerSecurity",
                    "__text": "Propeller cutout security triggered"
                                    },
                  {
                    "_name": "errorCommLost",
                    "__text": "Communication with motor failed by timeout"
                                    },
                  {
                    "_name": "errorRCEmergencyStop",
                    "__text": "RC emergency stop"
                                    },
                  {
                    "_name": "errorRealTime",
                    "__text": "Motor controler scheduler real-time out"
                + " of bounds"
                                    },
                  {
                    "_name": "errorMotorSetting",
                    "__text": "One or several incorrect values in motor "
                + "settings"
                                    },
                  {
                    "_name": "errorTemperature",
                    "__text": "Too hot or too cold Cypress temperature"
                                    },
                  {
                    "_name": "errorBatteryVoltage",
                    "__text": "Battery voltage out of bounds"
                                    },
                  {
                    "_name": "errorLipoCells",
                    "__text": "Incorrect number of LIPO cells"
                                    },
                  {
                    "_name": "errorMOSFET",
                    "__text": "Defectuous MOSFET or broken motor phases"
                                    },
                  {
                    "_name": "errorBootloader",
                    "__text": "Not use for BLDC but useful for HAL"
                                    },
                  {
                    "_name": "errorAssert",
                    "__text": "Error Made by BLDC_ASSERT()"
                                    }
                                ],
                "_name": "motorError",
                "_type": "enum",
                "__text": "Enumeration of the motor error"
                            }
                        ],
            "_name": "MotorErrorStateChanged",
            "__text": "Motor status changed"
                    },
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "name of the version : dot separated fields (major"
                + " version - minor version - firmware type - nb motors "
                + "handled). Firmware types : Release, Debug, Alpha, Test-bench"
            },
            "_name": "MotorSoftwareVersionChanged",
            "__text": "Motor software version status"
                    },
          {
            "arg": [
              {
                "_name": "nbFlights",
                "_type": "u16",
                "__text": "total number of flights"
                            },
              {
                "_name": "lastFlightDuration",
                "_type": "u16",
                "__text": "Duration of the last flight (in seconds)"
                            },
              {
                "_name": "totalFlightDuration",
                "_type": "u32",
                "__text": "Duration of all flights (in seconds)"
                            }
                        ],
            "_name": "MotorFlightsStatusChanged",
            "__text": "Motor flights status"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "noError",
                  "__text": "No error detected"
                                },
                {
                  "_name": "errorEEPRom",
                  "__text": "EEPROM access failure"
                                },
                {
                  "_name": "errorMotorStalled",
                  "__text": "Motor stalled"
                                },
                {
                  "_name": "errorPropellerSecurity",
                  "__text": "Propeller cutout security triggered"
                                },
                {
                  "_name": "errorCommLost",
                  "__text": "Communication with motor failed by timeout"
                                },
                {
                  "_name": "errorRCEmergencyStop",
                  "__text": "RC emergency stop"
                                },
                {
                  "_name": "errorRealTime",
                  "__text": "Motor controler scheduler real-time out of bounds"
                                },
                {
                  "_name": "errorMotorSetting",
                  "__text": "One or several incorrect values in motor settings"
                                },
                {
                  "_name": "errorBatteryVoltage",
                  "__text": "Battery voltage out of bounds"
                                },
                {
                  "_name": "errorLipoCells",
                  "__text": "Incorrect number of LIPO cells"
                                },
                {
                  "_name": "errorMOSFET",
                  "__text": "Defectuous MOSFET or broken motor phases"
                                },
                {
                  "_name": "errorTemperature",
                  "__text": "Too hot or too cold Cypress temperature"
                                },
                {
                  "_name": "errorBootloader",
                  "__text": "Not use for BLDC but useful for HAL"
                                },
                {
                  "_name": "errorAssert",
                  "__text": "Error Made by BLDC_ASSERT()"
                                }
                            ],
              "_name": "motorError",
              "_type": "enum",
              "__text": "Enumeration of the motor error"
            },
            "_name": "MotorErrorLastErrorChanged",
            "__text": "Motor status about last error"
                    },
          {
            "arg": {
              "_name": "serialID",
              "_type": "string",
              "__text": "Product P7ID"
            },
            "_name": "P7ID",
            "__text": "Product P7ID"
                    }
                ],
        "_name": "SettingsState",
        "_id": "16",
        "__text": "Settings state from product"
            },
      {
        "_name": "DirectorMode",
        "_id": "17",
        "__text": "Director mode commands"
            },
      {
        "_name": "DirectorModeState",
        "_id": "18",
        "__text": "Director mode state from product"
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "raw",
                  "__text": "Take raw image"
                                },
                {
                  "_name": "jpeg",
                  "__text": "Take a 4:3 jpeg photo"
                                },
                {
                  "_name": "snapshot",
                  "__text": "Take a 16:9 snapshot from camera"
                                },
                {
                  "_name": "jpeg_fisheye",
                  "__text": "Take jpeg fisheye image only"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of photo format"
            },
            "_name": "PictureFormatSelection",
            "__text": "The format of the photo"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "Auto guess of best white balance params"
                                },
                {
                  "_name": "tungsten",
                  "__text": "Tungsten white balance"
                                },
                {
                  "_name": "daylight",
                  "__text": "Daylight white balance"
                                },
                {
                  "_name": "cloudy",
                  "__text": "Cloudy white balance"
                                },
                {
                  "_name": "cool_white",
                  "__text": "White balance for a flash"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type auto white balance"
            },
            "_name": "AutoWhiteBalanceSelection",
            "__text": "AutoWhiteBalance mode"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "Exposition value (bounds given by ExpositionChanged"
                + " arg min and max, by default [-3:3])"
            },
            "_name": "ExpositionSelection",
            "__text": "The exposition of the image"
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "Saturation value (bounds given by SaturationChanged"
                + " arg min and max, by default [-100:100])"
            },
            "_name": "SaturationSelection",
            "__text": "The saturation of the image"
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "1 if timelapse is enabled, 0 otherwise"
                            },
              {
                "_name": "interval",
                "_type": "float",
                "__text": "interval in seconds for taking pictures"
                            }
                        ],
            "_name": "TimelapseSelection",
            "__text": "Picture taken periodically"
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "1 if video autorecord is enabled, 0 otherwise"
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage id to take video"
                            }
                        ],
            "_name": "VideoAutorecordSelection",
            "__text": "Video autorecord"
                    }
                ],
        "_name": "PictureSettings",
        "_id": "19",
        "__text": "Photo settings chosen by the user"
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "raw",
                  "__text": "Take raw image"
                                },
                {
                  "_name": "jpeg",
                  "__text": "Take a 4:3 jpeg photo"
                                },
                {
                  "_name": "snapshot",
                  "__text": "Take a 16:9 snapshot from camera"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of photo format"
            },
            "_name": "PictureFormatChanged",
            "__text": "The format of the photo"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "Auto guess of best white balance params"
                                },
                {
                  "_name": "tungsten",
                  "__text": "Tungsten white balance"
                                },
                {
                  "_name": "daylight",
                  "__text": "Daylight white balance"
                                },
                {
                  "_name": "cloudy",
                  "__text": "Cloudy white balance"
                                },
                {
                  "_name": "cool_white",
                  "__text": "White balance for a flash"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type auto white balance"
            },
            "_name": "AutoWhiteBalanceChanged",
            "__text": "AutoWhiteBalance mode"
                    },
          {
            "arg": [
              {
                "_name": "value",
                "_type": "float",
                "__text": "Exposition value"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Min exposition value"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Max exposition value"
                            }
                        ],
            "_name": "ExpositionChanged",
            "__text": "The exposition of the image"
                    },
          {
            "arg": [
              {
                "_name": "value",
                "_type": "float",
                "__text": "Saturation value"
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "Min saturation value"
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "Max saturation value"
                            }
                        ],
            "_name": "SaturationChanged",
            "__text": "The saturation of the image"
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "1 if timelapse is enabled, 0 otherwise"
                            },
              {
                "_name": "interval",
                "_type": "float",
                "__text": "interval in seconds for taking pictures"
                            },
              {
                "_name": "minInterval",
                "_type": "float",
                "__text": "Minimal interval for taking pictures"
                            },
              {
                "_name": "maxInterval",
                "_type": "float",
                "__text": "Maximal interval for taking pictures"
                            }
                        ],
            "_name": "TimelapseChanged",
            "__text": "Picture taken periodically"
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "1 if video autorecord is enabled, 0 otherwise"
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage id for the taken video"
                            }
                        ],
            "_name": "VideoAutorecordChanged",
            "__text": "Video autorecord"
                    }
                ],
        "_name": "PictureSettingsState",
        "_id": "20",
        "__text": "Photo settings state from product"
            },
      {
        "cmd": {
          "arg": {
            "_name": "enable",
            "_type": "u8",
            "__text": "1 to enable, 0 to disable."
          },
          "_name": "VideoEnable",
          "__text": "Enable/disable video streaming."
        },
        "_name": "MediaStreaming",
        "_id": "21",
        "__text": "Control media streaming behavior."
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "enabled",
                "__text": "Video streaming is enabled."
                            },
              {
                "_name": "disabled",
                "__text": "Video streaming is disabled."
                            },
              {
                "_name": "error",
                "__text": "Video streaming failed to start."
                            }
                        ],
            "_name": "enabled",
            "_type": "enum",
            "__text": "Current video streaming status."
          },
          "_name": "VideoEnableChanged",
          "__text": "Return video streaming status."
        },
        "_name": "MediaStreamingState",
        "_id": "22",
        "__text": "Media streaming status."
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "Home latitude in decimal degrees"
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "Home longitude in decimal degrees"
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "Home altitude in meters"
                            }
                        ],
            "_name": "SetHome",
            "__text": "Set home location"
                    },
          {
            "_name": "ResetHome",
            "__text": "Reset home location and let the drone make its own home"
                    },
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "GPS latitude in decimal degrees"
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "GPS longitude in decimal degrees"
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "GPS altitude in meters"
                            },
              {
                "_name": "horizontalAccuracy",
                "_type": "double",
                "__text": "Horizontal Accuracy in meter ; equal -1 if "
                + "no horizontal Accuracy"
                            },
              {
                "_name": "verticalAccuracy",
                "_type": "double",
                "__text": "Vertical Accuracy in meter ; equal -1 if "
                + "no vertical Accuracy"
                            }
                        ],
            "_name": "SendControllerGPS",
            "__text": "send controller GPS location"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "TAKEOFF",
                  "__text": "The drone will try to return to the take "
                + "off position"
                                },
                {
                  "_name": "PILOT",
                  "__text": "The drone will try to return to the pilot "
                + "position"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of the home position"
            },
            "_name": "HomeType",
            "__text": "Set user preference for the type of the home"
                + " position. Note that this is only a preference"
                    },
          {
            "arg": {
              "_name": "delay",
              "_type": "u16",
              "__text": "Delay in second"
            },
            "_name": "ReturnHomeDelay",
            "__text": "Set the delay after which the drone will "
                + "automatically try to return home"
                    }
                ],
        "_name": "GPSSettings",
        "_id": "23",
        "__text": "GPS settings"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "Home latitude in decimal degrees"
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "Home longitude in decimal degrees"
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "Home altitude in meters"
                            }
                        ],
            "_name": "HomeChanged",
            "__text": "Return home status"
                    },
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "Home latitude in decimal degrees"
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "Home longitude in decimal degrees"
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "Home altitude in meters"
                            }
                        ],
            "_name": "ResetHomeChanged",
            "__text": "Reset home status"
                    },
          {
            "arg": {
              "_name": "fixed",
              "_type": "u8",
              "__text": "1 if gps on drone is fixed, 0 otherwise"
            },
            "_name": "GPSFixStateChanged",
            "__text": "GPS fix state"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "updated",
                  "__text": "Drone GPS update succeed"
                                },
                {
                  "_name": "inProgress",
                  "__text": "Drone GPS update In progress"
                                },
                {
                  "_name": "failed",
                  "__text": "Drone GPS update failed"
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "The state of the gps update"
            },
            "_name": "GPSUpdateStateChanged",
            "__text": "GPS update state"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "TAKEOFF",
                  "__text": "The drone will try to return to the take "
                + "off position"
                                },
                {
                  "_name": "PILOT",
                  "__text": "The drone will try to return to the pilot"
                + " position"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of the home position"
            },
            "_name": "HomeTypeChanged",
            "__text": "State of the type of the home position. This "
                + "type is the user preference. The prefered home type "
                + "may not be available, see HomeTypeStatesChanged to"
                + " get the drone home type."
                    },
          {
            "arg": {
              "_name": "delay",
              "_type": "u16",
              "__text": "Delay in second"
            },
            "_name": "ReturnHomeDelayChanged",
            "__text": "State of the delay after which the drone will"
                + " automatically try to return home"
                    }
                ],
        "_name": "GPSSettingsState",
        "_id": "24",
        "__text": "GPS settings state"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "tilt",
                "_type": "i8",
                "__text": "Tilt camera consign for the drone [-100;100]"
                            },
              {
                "_name": "pan",
                "_type": "i8",
                "__text": "Pan camera consign for the drone [-100;100]"
                            }
                        ],
            "_name": "Orientation",
            "__text": "Camera orientation"
                    },
          {
            "arg": [
              {
                "_name": "tilt",
                "_type": "i8",
                "__text": "Tilt value (in degree)"
                            },
              {
                "_name": "pan",
                "_type": "i8",
                "__text": "Pan value (in degree)"
                            }
                        ],
            "_name": "defaultCameraOrientation",
            "__text": "Orientation of the camera center. This is the "
                + "value to send when we want to center the camera."
                    }
                ],
        "_name": "CameraState",
        "_id": "25",
        "__text": "Camera state"
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "fiftyHertz",
                  "__text": "Electric frequency of the country is 50hz"
                                },
                {
                  "_name": "sixtyHertz",
                  "__text": "Electric frequency of the country is 60hz"
                                }
                            ],
              "_name": "frequency",
              "_type": "enum",
              "__text": "Type of the electric frequency"
            },
            "_name": "electricFrequency",
            "__text": "Electric frequency of the country determined "
                + "by the position of the controller"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "Anti flickering based on the electric "
                + "frequency previously sent"
                                },
                {
                  "_name": "FixedFiftyHertz",
                  "__text": "Anti flickering based on a fixed frequency "
                + "of 50Hz"
                                },
                {
                  "_name": "FixedSixtyHertz",
                  "__text": "Anti flickering based on a fixed frequency"
                + " of 60Hz"
                                }
                            ],
              "_name": "mode",
              "_type": "enum",
              "__text": "Mode of the anti flickering functionnality"
            },
            "_name": "setMode",
            "__text": "Set the anti flickering mode"
                    }
                ],
        "_name": "Antiflickering",
        "_id": "29",
        "__text": "Anti-flickering related commands"
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "fiftyHertz",
                  "__text": "Electric frequency of the country is 50hz"
                                },
                {
                  "_name": "sixtyHertz",
                  "__text": "Electric frequency of the country is 60hz"
                                }
                            ],
              "_name": "frequency",
              "_type": "enum",
              "__text": "Type of the electric frequency"
            },
            "_name": "electricFrequencyChanged",
            "__text": "Electric frequency of the country determined by"
                + " the position of the controller"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "Anti flickering based on the electric "
                + "frequency previously sent"
                                },
                {
                  "_name": "FixedFiftyHertz",
                  "__text": "Anti flickering based on a fixed frequency"
                + " of 50Hz"
                                },
                {
                  "_name": "FixedSixtyHertz",
                  "__text": "Anti flickering based on a fixed frequency"
                + " of 60Hz"
                                }
                            ],
              "_name": "mode",
              "_type": "enum",
              "__text": "Mode of the anti flickering functionnality"
            },
            "_name": "modeChanged",
            "__text": "Anti flickering mode"
                    }
                ],
        "_name": "AntiflickeringState",
        "_id": "30",
        "__text": "Anti-flickering related states"
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "numberOfSatellite",
              "_type": "u8",
              "__text": "The number of satellite"
            },
            "_name": "NumberOfSatelliteChanged",
            "__text": "The number of satellite used to compute the gps "
                + "position"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "TAKEOFF",
                    "__text": "The drone will try to return to the take "
                + "off position"
                                    },
                  {
                    "_name": "PILOT",
                    "__text": "The drone will try to return to the pilot "
                + "position"
                                    },
                  {
                    "_name": "FIRST_FIX",
                    "__text": "The drone has not enough information, it"
                + " will try to return to the first GPS fix"
                                    }
                                ],
                "_name": "type",
                "_type": "enum",
                "__text": "The type of the return home"
                            },
              {
                "_name": "available",
                "_type": "u8",
                "__text": "1 if this type is available, 0 otherwise"
                            }
                        ],
            "_name": "HomeTypeAvailabilityChanged",
            "_listtype": "MAP",
            "__text": "Availability of the return home types in a map : "
                + "for each type other args will be sent by the drone"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "TAKEOFF",
                  "__text": "The drone will try to return to the take off"
                + " position"
                                },
                {
                  "_name": "PILOT",
                  "__text": "The drone will try to return to the pilot "
                + "position"
                                },
                {
                  "_name": "FIRST_FIX",
                  "__text": "The drone has not enough information, it will"
                + " try to return to the first GPS fix"
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "The type of the return home chosen"
            },
            "_name": "HomeTypeChosenChanged",
            "__text": "The return home type chosen"
                    }
                ],
        "_name": "GPSState",
        "_id": "31",
        "__text": "GPS related States"
            },
      {
        "cmd": {
          "arg": {
            "_name": "features",
            "_type": "u64",
            "__text": "\t\t  Bitfield representing enabled features. \t\t "
                + " Currently supported bits are: \t\t  - 0 : 720p streaming "
                + "\t\t  - 1 : No interface on SkyController HDMI \t\t"
          },
          "_name": "Features",
          "__text": "\t\tFeatures enabled \t\t  \t"
        },
        "_name": "PROState",
        "_id": "32",
        "__text": "\t  Pro features enabled on the Bebop \t    \t"
            }
        ],
    "_id": "1"
    },
  {
    "class": [
      {
        "cmd": {
          "_name": "Disconnect",
          "__text": "Signals the remote that the host will disconnect and "
                + "close its libARNetwork instance (and all threads that "
                + "use libARNetwork)"
        },
        "_name": "Network",
        "_id": "0",
        "__text": "Network related commands"
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "off_button",
                "__text": "The button off has been pressed"
                            },
              {
                "_name": "unknown",
                "__text": "Unknown generic cause"
                            }
                        ],
            "_name": "cause",
            "_type": "enum",
            "__text": "Cause of the disconnection of the product"
          },
          "_name": "Disconnection",
          "__text": "Signals the remote that the host will disconnect "
                + "and close its libARNetwork instance (and all threads "
                + "that use libARNetwork)"
        },
        "_name": "NetworkEvent",
        "_id": "1",
        "__text": "Network Event from product"
            },
      {
        "cmd": [
          {
            "_name": "AllSettings",
            "_timeout": "RETRY",
            "__text": "Get all product settings, the product must send "
                + "all settings"
                    },
          {
            "_name": "Reset",
            "__text": "Reset all settings"
                    },
          {
            "arg": {
              "_name": "name",
              "_type": "string",
              "__text": "Product name"
            },
            "_name": "ProductName",
            "__text": "Set Product name"
                    },
          {
            "arg": {
              "_name": "code",
              "_type": "string",
              "__text": "Country code with ISO 3166 format"
            },
            "_name": "Country",
            "__text": "Set current Country of controller"
                    },
          {
            "arg": {
              "_name": "automatic",
              "_type": "u8",
              "__text": "Boolean : 0 : Manual / 1 : Auto"
            },
            "_name": "AutoCountry",
            "__text": "Set Auto Country Settings"
                    }
                ],
        "_name": "Settings",
        "_id": "2",
        "__text": "Settings commands"
            },
      {
        "cmd": [
          {
            "_name": "AllSettingsChanged",
            "__text": "State sent when all settings has been sent."
                    },
          {
            "_name": "ResetChanged",
            "__text": "State sent when all settings has been resetting."
                    },
          {
            "arg": {
              "_name": "name",
              "_type": "string",
              "__text": "Product name"
            },
            "_name": "ProductNameChanged",
            "__text": "Product name"
                    },
          {
            "arg": [
              {
                "_name": "software",
                "_type": "string",
                "__text": "Product software version"
                            },
              {
                "_name": "hardware",
                "_type": "string",
                "__text": "Product hardware version"
                            }
                        ],
            "_name": "ProductVersionChanged",
            "__text": "Product versions"
                    },
          {
            "arg": {
              "_name": "high",
              "_type": "string",
              "__text": "Serial high number (hexadecimal value)"
            },
            "_name": "ProductSerialHighChanged",
            "__text": "Product serial number"
                    },
          {
            "arg": {
              "_name": "low",
              "_type": "string",
              "__text": "Serial low number (hexadecimal value)"
            },
            "_name": "ProductSerialLowChanged",
            "__text": "Product serial number"
                    },
          {
            "arg": {
              "_name": "code",
              "_type": "string",
              "__text": "Country code with ISO 3166 format, empty string "
                + "means unknown country."
            },
            "_name": "CountryChanged",
            "__text": "Inform current Country set in product. (Answer to "
                + "'Country' command)"
                    },
          {
            "arg": {
              "_name": "automatic",
              "_type": "u8",
              "__text": "Boolean : 0 : Manual / 1 : Auto"
            },
            "_name": "AutoCountryChanged",
            "__text": "Inform Auto Country Settings"
                    }
                ],
        "_name": "SettingsState",
        "_id": "3",
        "__text": "Settings state from product"
            },
      {
        "cmd": [
          {
            "_name": "AllStates",
            "_timeout": "RETRY",
            "__text": "Get all product states."
                    },
          {
            "arg": {
              "_name": "date",
              "_type": "string",
              "__text": "Date with ISO-8601 format"
            },
            "_name": "CurrentDate",
            "__text": "Set current date of controller"
                    },
          {
            "arg": {
              "_name": "time",
              "_type": "string",
              "__text": "Time with ISO-8601 format"
            },
            "_name": "CurrentTime",
            "__text": "Set current time of controller"
                    },
          {
            "_name": "Reboot",
            "__text": "Command to ask reboot to product"
                    }
                ],
        "_name": "Common",
        "_id": "4",
        "__text": "Common commands"
            },
      {
        "cmd": [
          {
            "_name": "AllStatesChanged",
            "__text": "State sent when all product states has been sent."
                    },
          {
            "arg": {
              "_name": "percent",
              "_type": "u8",
              "__text": "Battery percentage"
            },
            "_name": "BatteryStateChanged",
            "__text": "Battery state"
                    },
          {
            "arg": [
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage id (unique)"
                            },
              {
                "_name": "name",
                "_type": "string",
                "__text": "Mass storage name"
                            }
                        ],
            "_name": "MassStorageStateListChanged",
            "_listtype": "MAP",
            "__text": "Mass storage state list"
                    },
          {
            "arg": [
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "Mass storage state id (unique)"
                            },
              {
                "_name": "size",
                "_type": "u32",
                "__text": "Mass storage size in MBytes"
                            },
              {
                "_name": "used_size",
                "_type": "u32",
                "__text": "Mass storage used size in MBytes"
                            },
              {
                "_name": "plugged",
                "_type": "u8",
                "__text": "Mass storage plugged (1 if mass storage is "
                + "plugged, otherwise 0)"
                            },
              {
                "_name": "full",
                "_type": "u8",
                "__text": "Mass storage full information state (1 if "
                + "mass storage full, 0 otherwise)."
                            },
              {
                "_name": "internal",
                "_type": "u8",
                "__text": "Mass storage internal type state (1 if mass "
                + "storage is internal, 0 otherwise)"
                            }
                        ],
            "_name": "MassStorageInfoStateListChanged",
            "_listtype": "MAP",
            "__text": "Mass storage info state list"
                    },
          {
            "arg": {
              "_name": "date",
              "_type": "string",
              "__text": "Date with ISO-8601 format"
            },
            "_name": "CurrentDateChanged",
            "__text": "Current date state"
                    },
          {
            "arg": {
              "_name": "time",
              "_type": "string",
              "__text": "Time with ISO-8601 format"
            },
            "_name": "CurrentTimeChanged",
            "__text": "Current time state"
                    },
          {
            "arg": [
              {
                "_name": "free_space",
                "_type": "u32",
                "__text": "Mass storage free space in MBytes"
                            },
              {
                "_name": "rec_time",
                "_type": "u16",
                "__text": "Mass storage record time reamining in minute"
                            },
              {
                "_name": "photo_remaining",
                "_type": "u32",
                "__text": "Mass storage photo remaining"
                            }
                        ],
            "_name": "MassStorageInfoRemainingListChanged",
            "_listtype": "LIST",
            "__text": "Mass storage info remaining list"
                    },
          {
            "arg": {
              "_name": "rssi",
              "_type": "i16",
              "__text": "RSSI of the signal between controller and the "
                + "product (in dbm)"
            },
            "_name": "WifiSignalChanged",
            "__text": "Wifi Signal between controller and product state"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "IMU",
                    "__text": "Inertial Measurement Unit sensor"
                                    },
                  {
                    "_name": "barometer",
                    "__text": "Barometer sensor"
                                    },
                  {
                    "_name": "ultrasound",
                    "__text": "Ultrasonic sensor"
                                    },
                  {
                    "_name": "GPS",
                    "__text": "GPS sensor"
                                    },
                  {
                    "_name": "magnetometer",
                    "__text": "Magnetometer sensor"
                                    },
                  {
                    "_name": "vertical_camera",
                    "__text": "Vertical Camera sensor"
                                    }
                                ],
                "_name": "sensorName",
                "_type": "enum",
                "__text": "Sensor name"
                            },
              {
                "_name": "sensorState",
                "_type": "u8",
                "__text": "Sensor state (1 if the sensor is OK, 0 if the "
                + "sensor is NOT OK)"
                            }
                        ],
            "_name": "SensorsStatesListChanged",
            "_listtype": "MAP",
            "__text": "Sensors states list"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "RS_TRAVIS",
                  "__text": "Travis (RS taxi) model."
                                },
                {
                  "_name": "RS_MARS",
                  "__text": "Mars (RS space) model"
                                },
                {
                  "_name": "RS_SWAT",
                  "__text": "SWAT (RS SWAT) model"
                                },
                {
                  "_name": "RS_MCLANE",
                  "__text": "Mc Lane (RS police) model"
                                },
                {
                  "_name": "RS_BLAZE",
                  "__text": "Blaze (RS fire) model"
                                },
                {
                  "_name": "RS_ORAK",
                  "__text": "Orak (RS carbon hydrofoil) model"
                                },
                {
                  "_name": "RS_NEWZ",
                  "__text": "New Z (RS wooden hydrofoil) model"
                                },
                {
                  "_name": "JS_MARSHALL",
                  "__text": "Marshall (JS fire) model"
                                },
                {
                  "_name": "JS_DIESEL",
                  "__text": "Diesel (JS SWAT) model"
                                },
                {
                  "_name": "JS_BUZZ",
                  "__text": "Buzz (JS space) model"
                                },
                {
                  "_name": "JS_MAX",
                  "__text": "Max (JS F1) model"
                                },
                {
                  "_name": "JS_JETT",
                  "__text": "Jett (JS flames) model"
                                },
                {
                  "_name": "JS_TUKTUK",
                  "__text": "Tuk-Tuk (JS taxi) model"
                                }
                            ],
              "_name": "model",
              "_type": "enum",
              "__text": "The Model of the product."
            },
            "_name": "ProductModel",
            "__text": "Inform of the product model. This is used to customize"
                + " the UI depending on the connected product."
                    },
          {
            "arg": [
              {
                "_name": "listFlags",
                "_type": "u8",
                "__text": "List entry attribute Bitfield. 0x01: First: "
                + "indicate it's the first element of the list.  0x02: Last: "
                + " indicate it's the last element of the list. 0x04: Empty:"
                + " indicate the list is empty (implies First/Last). All other"
                + " arguments should be ignored."
                            },
              {
                "_name": "countryCodes",
                "_type": "string",
                "__text": "Following of country code with ISO 3166 format, "
                + "separated by \";\". Be careful of the command size allowed"
                + " by the network used. If necessary, split the list in "
                + "several commands."
                            }
                        ],
            "_name": "CountryListKnown",
            "_listtype": "LIST",
            "__text": "List of the countries known by the device"
                    }
                ],
        "_name": "CommonState",
        "_id": "5",
        "__text": "Common state from product"
            },
      {
        "cmd": [
          {
            "_name": "SwitchOff",
            "__text": "@deprecated Switch off the drone when a overheat "
                + "appeared"
                    },
          {
            "_name": "Ventilate",
            "__text": "@deprecated Ventilate the drone when a overheat "
                + "appeared"
                    }
                ],
        "_name": "OverHeat",
        "_id": "6",
        "__text": "Over heat commands"
            },
      {
        "cmd": [
          {
            "_name": "OverHeatChanged",
            "__text": "Overheat temperature reached"
                    },
          {
            "arg": {
              "_name": "regulationType",
              "_type": "u8",
              "__text": "Type of overheat regulation : 0 for ventilation, "
                + "1 for switch off"
            },
            "_name": "OverHeatRegulationChanged",
            "__text": "Overheat regulation state changed"
                    }
                ],
        "_name": "OverHeatState",
        "_id": "7",
        "__text": "Overheat state from product"
            },
      {
        "cmd": {
          "arg": {
            "_name": "piloting",
            "_type": "u8",
            "__text": "0 when the application is not in the piloting "
                + "HUD, 1 when it enters the HUD."
          },
          "_name": "isPilotingChanged",
          "__text": "Tell the device when the controller application "
                + "enters/leaves the piloting HUD."
        },
        "_name": "ControllerState",
        "_id": "8",
        "__text": "Notify the device about the state of the controller "
                + "application."
            },
      {
        "cmd": {
          "arg": {
            "_name": "outdoor",
            "_type": "u8",
            "__text": "1 if it should use outdoor wifi settings, 0 otherwise"
          },
          "_name": "OutdoorSetting",
          "__text": "Send to product if it should use its outdoor wifi "
                + "config, or indoor"
        },
        "_name": "WifiSettings",
        "_id": "9",
        "__text": "Wifi settings commands"
            },
      {
        "cmd": {
          "arg": {
            "_name": "outdoor",
            "_type": "u8",
            "__text": "1 if it should use outdoor wifi settings, 0 otherwise"
          },
          "_name": "outdoorSettingsChanged",
          "_type": "u8",
          "__text": "Status of the wifi config : either indoor or outdoor"
        },
        "_name": "WifiSettingsState",
        "_id": "10",
        "__text": "Wifi settings state from product"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "filepath",
                "_type": "string",
                "__text": "flight plan file path from the mavlink ftp root"
                            },
              {
                "enum": [
                  {
                    "_name": "flightPlan",
                    "__text": "Mavlink file for FlightPlan"
                                    },
                  {
                    "_name": "mapMyHouse",
                    "__text": "Mavlink file for MapMyHouse"
                                    }
                                ],
                "_name": "type",
                "_type": "enum",
                "__text": "type of the played mavlink file"
                            }
                        ],
            "_name": "Start",
            "__text": "Start the flight plan"
                    },
          {
            "_name": "Pause",
            "__text": "Pause the flightplan (can be restarted with a start)"
                    },
          {
            "_name": "Stop",
            "__text": "Stop the flightplan"
                    }
                ],
        "_name": "Mavlink",
        "_id": "11",
        "__text": "Mavlink flight plans commands"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "playing",
                    "__text": "Mavlink file is playing"
                                    },
                  {
                    "_name": "stopped",
                    "__text": "Mavlink file is stopped (arg filepath and "
                + "type are useless in this state)"
                                    },
                  {
                    "_name": "paused",
                    "__text": "Mavlink file is paused"
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "State of the mavlink"
                            },
              {
                "_name": "filepath",
                "_type": "string",
                "__text": "flight plan file path from the mavlink ftp root"
                            },
              {
                "enum": [
                  {
                    "_name": "flightPlan",
                    "__text": "Mavlink file for FlightPlan"
                                    },
                  {
                    "_name": "mapMyHouse",
                    "__text": "Mavlink file for MapMyHouse"
                                    }
                                ],
                "_name": "type",
                "_type": "enum",
                "__text": "type of the played mavlink file"
                            }
                        ],
            "_name": "MavlinkFilePlayingStateChanged",
            "__text": "Playing state of a mavlink flight plan"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "none",
                  "__text": "There is no error"
                                },
                {
                  "_name": "notInOutDoorMode",
                  "__text": "The drone is not in outdoor mode"
                                },
                {
                  "_name": "gpsNotFixed",
                  "__text": "The gps is not fixed"
                                },
                {
                  "_name": "notCalibrated",
                  "__text": "The magnetometer of the drone is not calibrated"
                                }
                            ],
              "_name": "error",
              "_type": "enum",
              "__text": "State of play error"
            },
            "_name": "MavlinkPlayErrorStateChanged",
            "__text": "FlightPlan play state error"
                    }
                ],
        "_name": "MavlinkState",
        "_id": "12",
        "__text": "Mavlink flight plans states commands"
            },
      {
        "cmd": {
          "arg": {
            "_name": "calibrate",
            "_type": "u8",
            "__text": "1 if the calibration should be started, 0 if it "
                + "should be aborted"
          },
          "_name": "MagnetoCalibration",
          "__text": "Sent when a calibration of the magnetometer is asked "
                + "or is aborted"
        },
        "_name": "Calibration",
        "_id": "13",
        "__text": "Calibration commands"
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "xAxisCalibration",
                "_type": "u8",
                "__text": "State of the x axis (roll) calibration : 1 if "
                + "calibration is done, 0 otherwise"
                            },
              {
                "_name": "yAxisCalibration",
                "_type": "u8",
                "__text": "State of the y axis (pitch) calibration : 1 if "
                + "calibration is done, 0 otherwise"
                            },
              {
                "_name": "zAxisCalibration",
                "_type": "u8",
                "__text": "State of the z axis (yaw) calibration : 1 if "
                + "calibration is done, 0 otherwise"
                            },
              {
                "_name": "calibrationFailed",
                "_type": "u8",
                "__text": "1 if calibration has failed, 0 otherwise. If this "
                + "arg is 1, consider all previous arg as 0"
                            }
                        ],
            "_name": "MagnetoCalibrationStateChanged",
            "__text": "Sent when the state of the magneto calibration has "
                + "changed"
                    },
          {
            "arg": {
              "_name": "required",
              "_type": "u8",
              "__text": "1 if calibration is required, 0 if current "
                + "calibration is still valid"
            },
            "_name": "MagnetoCalibrationRequiredState",
            "__text": "Status of the calibration requirement"
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "xAxis",
                  "__text": "If the current calibration axis should be the x "
                + "axis"
                                },
                {
                  "_name": "yAxis",
                  "__text": "If the current calibration axis should be the y "
                + "axis"
                                },
                {
                  "_name": "zAxis",
                  "__text": "If the current calibration axis should be the z "
                + "axis"
                                },
                {
                  "_name": "none",
                  "__text": "If none of the axis should be calibrated"
                                }
                            ],
              "_name": "axis",
              "_type": "enum",
              "__text": "The axis to calibrate"
            },
            "_name": "MagnetoCalibrationAxisToCalibrateChanged",
            "__text": "Event sent by a product to inform about the axis to "
                + "calibrate"
                    },
          {
            "arg": {
              "_name": "started",
              "_type": "u8",
              "__text": "1 if calibration has started, 0 otherwise"
            },
            "_name": "MagnetoCalibrationStartedChanged",
            "__text": "Status of the calibration process"
                    }
                ],
        "_name": "CalibrationState",
        "_id": "14",
        "__text": "Status of the calibration"
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "fov",
              "_type": "float",
              "__text": "Value of the camera horizontal fov (in degree)"
                        },
            {
              "_name": "panMax",
              "_type": "float",
              "__text": "Value of max pan (right pan) (in degree)"
                        },
            {
              "_name": "panMin",
              "_type": "float",
              "__text": "Value of min pan (left pan) (in degree)"
                        },
            {
              "_name": "tiltMax",
              "_type": "float",
              "__text": "Value of max tilt (top tilt) (in degree)"
                        },
            {
              "_name": "tiltMin",
              "_type": "float",
              "__text": "Value of min tilt (bottom tilt) (in degree)"
                        }
                    ],
          "_name": "CameraSettingsChanged",
          "__text": "Status of the camera settings"
        },
        "_name": "CameraSettingsState",
        "_id": "15",
        "__text": "Status of the camera settings"
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "latitude",
              "_type": "double",
              "__text": "Controller latitude in decimal degrees"
                        },
            {
              "_name": "longitude",
              "_type": "double",
              "__text": "Controller longitude in decimal degrees"
                        }
                    ],
          "_name": "ControllerPositionForRun",
          "__text": "Set the controller position for a run. This command "
                + "is used by all non gps products. Watch out, this command "
                + "cannot be used with BLE products"
        },
        "_name": "GPS",
        "_id": "16",
        "__text": "GPS related commands"
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "AvailabilityState",
              "_type": "u8",
              "__text": "Running a flightPlan file is available "
                + "(1 running a flightPlan file is available, otherwise 0)"
            },
            "_name": "AvailabilityStateChanged",
            "__text": "State of availability to run a flight plan file"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "GPS",
                    "__text": "GPS for Drone FlightPlan"
                                    },
                  {
                    "_name": "Calibration",
                    "__text": "Calibration for Drone FlightPlan"
                                    },
                  {
                    "_name": "Mavlink_File",
                    "__text": "Mavlink file for Drone FlightPlan"
                                    },
                  {
                    "_name": "TakeOff",
                    "__text": "Take off"
                                    }
                                ],
                "_name": "component",
                "_type": "enum",
                "__text": "Drone FlightPlan component id (unique)"
                            },
              {
                "_name": "State",
                "_type": "u8",
                "__text": "State of the FlightPlan component "
                + "(1 FlightPlan component OK, otherwise 0)"
                            }
                        ],
            "_name": "ComponentStateListChanged",
            "_listtype": "MAP",
            "__text": "List of state of drone flightPlan components"
                    }
                ],
        "_name": "FlightPlanState",
        "_id": "17",
        "__text": "FlightPlan state commands"
            },
      {
        "cmd": [
          {
            "_name": "StartingErrorEvent",
            "__text": "Event of flight plan start error"
                    },
          {
            "_name": "SpeedBridleEvent",
            "__text": "Bridle speed of the drone"
                    }
                ],
        "_name": "FlightPlanEvent",
        "_id": "19",
        "__text": "FlightPlan Event commands"
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "version of libARCommands (\"1.2.3.4\"format)"
            },
            "_name": "ControllerLibARCommandsVersion",
            "__text": "Controller libARCommands version"
                    },
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "version of libARCommands (\"1.2.3.4\"format)"
            },
            "_name": "SkyControllerLibARCommandsVersion",
            "__text": "SkyController libARCommands version"
                    },
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "version of libARCommands (\"1.2.3.4\"format)"
            },
            "_name": "DeviceLibARCommandsVersion",
            "__text": "Device libARCommands version"
                    }
                ],
        "_name": "ARLibsVersionsState",
        "_id": "18",
        "__text": "ARlibs Versions Commands"
            },
      {
        "cmd": {
          "arg": {
            "_name": "ready",
            "_type": "u8",
            "__text": "Bit field for TX and RX ready. bit 0 is 1 "
                + "if controller is ready and wants to receive sound "
                + "(Drone TX) bit 1 is 1 if controller is ready and"
                + " wants to send sound (Drone RX)"
          },
          "_name": "ControllerReadyForStreaming",
          "__text": "Tell the firmware whether the controller is "
                + "ready to start audio streaming."
        },
        "_name": "Audio",
        "_id": "20",
        "__text": "Audio-related commands."
            },
      {
        "cmd": {
          "arg": {
            "_name": "running",
            "_type": "u8",
            "__text": "Bit field for TX and RX running bit 0 is 1 if "
                + "Drone TX is running bit 1 is 1 if Drone RX is running"
          },
          "_name": "AudioStreamingRunning",
          "__text": "Notify the controller whether the audio streaming"
                + " is running."
        },
        "_name": "AudioState",
        "_id": "21",
        "__text": "Audio-related state updates."
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "left",
              "_type": "u8",
              "__text": "Set the left LED intensity value (0 through 255)."
                        },
            {
              "_name": "right",
              "_type": "u8",
              "__text": "Set the right LED intensity value (0 through 255)."
                        }
                    ],
          "_name": "intensity",
          "__text": "Set instensity of lighting LEDs."
        },
        "_name": "Headlights",
        "_id": "22",
        "__text": "Controls the headlight LEDs of the Evo variants."
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "left",
              "_type": "u8",
              "__text": "The intensity value for the left LED (0 through 255)."
                        },
            {
              "_name": "right",
              "_type": "u8",
              "__text": "The intensity value for the right LED (0 through 255)."
                        }
                    ],
          "_name": "intensityChanged",
          "__text": "Notify the instensity values for headlight LEDs."
        },
        "_name": "HeadlightsState",
        "_id": "23",
        "__text": "Get information about the state of the Evo variants' LEDs."
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "HEADLIGHTS_FLASH",
                  "__text": "Flash headlights."
                                },
                {
                  "_name": "HEADLIGHTS_BLINK",
                  "__text": "Blink headlights."
                                },
                {
                  "_name": "HEADLIGHTS_OSCILLATION",
                  "__text": "Oscillating headlights."
                                },
                {
                  "_name": "SPIN",
                  "__text": "Spin animation."
                                },
                {
                  "_name": "TAP",
                  "__text": "Tap animation."
                                },
                {
                  "_name": "SLOW_SHAKE",
                  "__text": "Slow shake animation."
                                },
                {
                  "_name": "METRONOME",
                  "__text": "Metronome animation."
                                },
                {
                  "_name": "ONDULATION",
                  "__text": "Standing dance animation."
                                },
                {
                  "_name": "SPIN_JUMP",
                  "__text": "Spin jump animation."
                                },
                {
                  "_name": "SPIN_TO_POSTURE",
                  "__text": "Spin that end in standing posture, or in"
                + " jumper if it was standing animation."
                                },
                {
                  "_name": "SPIRAL",
                  "__text": "Spiral animation."
                                },
                {
                  "_name": "SLALOM",
                  "__text": "Slalom animation."
                                },
                {
                  "_name": "BOOST",
                  "__text": "Boost animation."
                                }
                            ],
              "_name": "anim",
              "_type": "enum",
              "__text": "Animation to start."
            },
            "_name": "StartAnimation",
            "__text": "Start a paramaterless animation."
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "HEADLIGHTS_FLASH",
                  "__text": "Flash headlights."
                                },
                {
                  "_name": "HEADLIGHTS_BLINK",
                  "__text": "Blink headlights."
                                },
                {
                  "_name": "HEADLIGHTS_OSCILLATION",
                  "__text": "Oscillating headlights."
                                },
                {
                  "_name": "SPIN",
                  "__text": "Spin animation."
                                },
                {
                  "_name": "TAP",
                  "__text": "Tap animation."
                                },
                {
                  "_name": "SLOW_SHAKE",
                  "__text": "Slow shake animation."
                                },
                {
                  "_name": "METRONOME",
                  "__text": "Metronome animation."
                                },
                {
                  "_name": "ONDULATION",
                  "__text": "Standing dance animation."
                                },
                {
                  "_name": "SPIN_JUMP",
                  "__text": "Spin jump animation."
                                },
                {
                  "_name": "SPIN_TO_POSTURE",
                  "__text": "Spin that end in standing posture, or in"
                + " jumper if it was standing animation."
                                },
                {
                  "_name": "SPIRAL",
                  "__text": "Spiral animation."
                                },
                {
                  "_name": "SLALOM",
                  "__text": "Slalom animation."
                                },
                {
                  "_name": "BOOST",
                  "__text": "Boost animation."
                                }
                            ],
              "_name": "anim",
              "_type": "enum",
              "__text": "Animation to stop."
            },
            "_name": "StopAnimation",
            "__text": "Stop a running animation."
                    },
          {
            "_name": "StopAllAnimations",
            "__text": "Stop all running animations."
                    }
                ],
        "_name": "Animations",
        "_id": "24",
        "__text": "Animations-related commands."
            },
      {
        "cmd": {
          "arg": [
            {
              "enum": [
                {
                  "_name": "HEADLIGHTS_FLASH",
                  "__text": "Flash headlights."
                                },
                {
                  "_name": "HEADLIGHTS_BLINK",
                  "__text": "Blink headlights."
                                },
                {
                  "_name": "HEADLIGHTS_OSCILLATION",
                  "__text": "Oscillating headlights."
                                },
                {
                  "_name": "SPIN",
                  "__text": "Spin animation."
                                },
                {
                  "_name": "TAP",
                  "__text": "Tap animation."
                                },
                {
                  "_name": "SLOW_SHAKE",
                  "__text": "Slow shake animation."
                                },
                {
                  "_name": "METRONOME",
                  "__text": "Metronome animation."
                                },
                {
                  "_name": "ONDULATION",
                  "__text": "Standing dance animation."
                                },
                {
                  "_name": "SPIN_JUMP",
                  "__text": "Spin jump animation."
                                },
                {
                  "_name": "SPIN_TO_POSTURE",
                  "__text": "Spin that end in standing posture, or in"
                + " jumper if it was standing animation."
                                },
                {
                  "_name": "SPIRAL",
                  "__text": "Spiral animation."
                                },
                {
                  "_name": "SLALOM",
                  "__text": "Slalom animation."
                                },
                {
                  "_name": "BOOST",
                  "__text": "Boost animation."
                                }
                            ],
              "_name": "anim",
              "_type": "enum",
              "__text": "Animation type."
                        },
            {
              "enum": [
                {
                  "_name": "stopped",
                  "__text": "animation is stopped"
                                },
                {
                  "_name": "started",
                  "__text": "animation is started"
                                },
                {
                  "_name": "notAvailable",
                  "__text": "The animation is not available"
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "State of the animation"
                        },
            {
              "enum": [
                {
                  "_name": "ok",
                  "__text": "No Error"
                                },
                {
                  "_name": "unknown",
                  "__text": "Unknown generic error"
                                }
                            ],
              "_name": "error",
              "_type": "enum",
              "__text": "Error to explain the state"
                        }
                    ],
          "_name": "List",
          "_listtype": "MAP",
          "__text": "List of animations state."
        },
        "_name": "AnimationsState",
        "_id": "25",
        "__text": "Animations-related notification/feedback commands."
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "NO_ACCESSORY",
                "__text": "No accessory."
                            },
              {
                "_name": "STD_WHEELS",
                "__text": "Standard wheels"
                            },
              {
                "_name": "TRUCK_WHEELS",
                "__text": "Truck wheels"
                            },
              {
                "_name": "HULL",
                "__text": "Hull"
                            },
              {
                "_name": "HYDROFOIL",
                "__text": "Hydrofoil"
                            }
                        ],
            "_name": "accessory",
            "_type": "enum",
            "__text": "Accessory configuration to set."
          },
          "_name": "Config",
          "__text": "Set the current accessory configuration."
        },
        "_name": "Accessory",
        "_id": "26",
        "__text": "Accessories-related commands."
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "NO_ACCESSORY",
                  "__text": "No accessory."
                                },
                {
                  "_name": "STD_WHEELS",
                  "__text": "Standard wheels"
                                },
                {
                  "_name": "TRUCK_WHEELS",
                  "__text": "Truck wheels"
                                },
                {
                  "_name": "HULL",
                  "__text": "Hull"
                                },
                {
                  "_name": "HYDROFOIL",
                  "__text": "Hydrofoil"
                                }
                            ],
              "_name": "accessory",
              "_type": "enum",
              "__text": "Accessory configurations supported by the product."
            },
            "_name": "SupportedAccessoriesListChanged",
            "_listtype": "MAP",
            "__text": "List of supported accessories"
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "UNCONFIGURED",
                    "__text": "No accessory configuration set. "
                + "Controller needs to set one."
                                    },
                  {
                    "_name": "NO_ACCESSORY",
                    "__text": "No accessory."
                                    },
                  {
                    "_name": "STD_WHEELS",
                    "__text": "Standard wheels"
                                    },
                  {
                    "_name": "TRUCK_WHEELS",
                    "__text": "Truck wheels"
                                    },
                  {
                    "_name": "HULL",
                    "__text": "Hull"
                                    },
                  {
                    "_name": "HYDROFOIL",
                    "__text": "Hydrofoil"
                                    }
                                ],
                "_name": "newAccessory",
                "_type": "enum",
                "__text": "Accessory configuration reported by firmware."
                            },
              {
                "enum": [
                  {
                    "_name": "OK",
                    "__text": "No error. Accessory config change successful."
                                    },
                  {
                    "_name": "UNKNOWN",
                    "__text": "Cannot change accessory configuration"
                + " for some reason."
                                    },
                  {
                    "_name": "FLYING",
                    "__text": "Cannot change accessory configuration"
                + " while flying."
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "Error code."
                            }
                        ],
            "_name": "AccessoryConfigChanged",
            "__text": "Accessory config response."
                    },
          {
            "arg": {
              "_name": "enabled",
              "_type": "u8",
              "__text": "1 if the modification of the accessory Config"
                + " is enabled, 0 otherwise"
            },
            "_name": "AccessoryConfigModificationEnabled",
            "__text": "Possibility to modify the accessory configuration."
                    }
                ],
        "_name": "AccessoryState",
        "_id": "27",
        "__text": "Accessories-related commands."
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "SLOW",
                "__text": "Fully charge the battery at a slow rate."
                + " Typically limit max charge current to 512 mA."
                            },
              {
                "_name": "MODERATE",
                "__text": "Almost fully-charge the battery at moderate"
                + " rate (> 512mA) but slower than the fastest rate."
                            },
              {
                "_name": "FAST",
                "__text": "Almost fully-charge the battery at the "
                + "highest possible rate supported by the charger."
                            }
                        ],
            "_name": "rate",
            "_type": "enum",
            "__text": "The new maximum charge rate."
          },
          "_name": "SetMaxChargeRate",
          "__text": "@deprecated Set the maximum charge rate"
                + " allowed to charge a battery."
        },
        "_name": "Charger",
        "_id": "28",
        "__text": "Commands sent by the controller to set charger parameters."
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "SLOW",
                  "__text": "Fully charge the battery at a slow "
                + "rate. Typically limit max charge current to 512 mA."
                                },
                {
                  "_name": "MODERATE",
                  "__text": "Almost fully-charge the battery at "
                + "moderate rate (> 512 mA) but slower than the fastest rate."
                                },
                {
                  "_name": "FAST",
                  "__text": "Almost fully-charge the battery at the"
                + " highest possible rate supported by the charger."
                                }
                            ],
              "_name": "rate",
              "_type": "enum",
              "__text": "The current maximum charge rate."
            },
            "_name": "MaxChargeRateChanged",
            "__text": "@deprecated The maximum charge rate reported "
                + "by the firmware."
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "DISCHARGING",
                    "__text": "The battery is discharging."
                                    },
                  {
                    "_name": "CHARGING_SLOW",
                    "__text": "The battery is charging at a slow rate"
                + " about 512 mA."
                                    },
                  {
                    "_name": "CHARGING_MODERATE",
                    "__text": "The battery is charging at a moderate rate "
                + "(> 512 mA) but slower than the fastest rate."
                                    },
                  {
                    "_name": "CHARGING_FAST",
                    "__text": "The battery is charging at a the fastest rate."
                                    },
                  {
                    "_name": "BATTERY_FULL",
                    "__text": "The charger is plugged and the battery "
                + "is fully charged."
                                    }
                                ],
                "_name": "status",
                "_type": "enum",
                "__text": "Charger status."
                            },
              {
                "enum": [
                  {
                    "_name": "UNKNOWN",
                    "__text": "The charge phase is unknown or irrelevant."
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_1",
                    "__text": "First phase of the charging process. "
                + "The battery is charging with constant current."
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_2",
                    "__text": "Second phase of the charging process. "
                + "The battery is charging with constant current, with a "
                + "higher voltage than the first phase."
                                    },
                  {
                    "_name": "CONSTANT_VOLTAGE",
                    "__text": "Last part of the charging process. The"
                + " battery is charging with a constant voltage."
                                    },
                  {
                    "_name": "CHARGED",
                    "__text": "The battery is fully charged."
                                    }
                                ],
                "_name": "phase",
                "_type": "enum",
                "__text": "The current charging phase."
                            }
                        ],
            "_name": "CurrentChargeStateChanged",
            "__text": "@deprecated The charge status of the battery changed."
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "UNKNOWN",
                  "__text": "The last charge rate is not known."
                                },
                {
                  "_name": "SLOW",
                  "__text": "Slow charge rate."
                                },
                {
                  "_name": "MODERATE",
                  "__text": "Moderate charge rate."
                                },
                {
                  "_name": "FAST",
                  "__text": "Fast charge rate."
                                }
                            ],
              "_name": "rate",
              "_type": "enum",
              "__text": "The charge rate recorded by the firmware for"
                + " the last charge."
            },
            "_name": "LastChargeRateChanged",
            "__text": "@deprecated The charge rate of the last charge"
                + " sent by the firmware."
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "UNKNOWN",
                    "__text": "The charge phase is unknown or irrelevant."
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_1",
                    "__text": "First phase of the charging process. "
                + "The battery is charging with constant current."
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_2",
                    "__text": "Second phase of the charging process. "
                + "The battery is charging with constant current, with a "
                + "higher voltage than the first phase."
                                    },
                  {
                    "_name": "CONSTANT_VOLTAGE",
                    "__text": "Last part of the charging process. The "
                + "battery is charging with a constant voltage."
                                    },
                  {
                    "_name": "CHARGED",
                    "__text": "The battery is fully charged."
                                    },
                  {
                    "_name": "DISCHARGING",
                    "__text": "The battery is discharging; Other "
                + "arguments refers to the last charge."
                                    }
                                ],
                "_name": "phase",
                "_type": "enum",
                "__text": "The current charging phase."
                            },
              {
                "enum": [
                  {
                    "_name": "UNKNOWN",
                    "__text": "The charge rate is not known."
                                    },
                  {
                    "_name": "SLOW",
                    "__text": "Slow charge rate."
                                    },
                  {
                    "_name": "MODERATE",
                    "__text": "Moderate charge rate."
                                    },
                  {
                    "_name": "FAST",
                    "__text": "Fast charge rate."
                                    }
                                ],
                "_name": "rate",
                "_type": "enum",
                "__text": "The charge rate. If phase is DISCHARGING, "
                + "refers to the last charge."
                            },
              {
                "_name": "intensity",
                "_type": "u8",
                "__text": "The charging intensity, in dA. (12dA = 1,2A) ; "
                + "If phase is DISCHARGING, refers to the last charge. "
                + "Equals to 0 if not known."
                            },
              {
                "_name": "fullChargingTime",
                "_type": "u8",
                "__text": "The full charging time estimated, in minute. "
                + "If phase is DISCHARGING, refers to the last charge. "
                + "Equals to 0 if not known."
                            }
                        ],
            "_name": "ChargingInfo",
            "__text": "Information of the charge."
                    }
                ],
        "_name": "ChargerState",
        "_id": "29",
        "__text": "Commands sent by the firmware to advertise the "
                + "charger status."
            }
        ],
    "_id": "0",
    "__text": "All common commands shared between all projects"
    }
  ];
