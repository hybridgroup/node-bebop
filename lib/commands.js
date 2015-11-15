module.exports = [
  {
    "class": [
      {
        "cmd": [
          {
            "_name": "FlatTrim",
            "__text": "\n            Do a flat trim\n        "
                    },
          {
            "_name": "TakeOff",
            "__text": "\n            Ask the drone to take off\n        "
                    },
          {
            "arg": [
              {
                "_name": "flag",
                "_type": "u8",
                "__text": "\n                Boolean flag to activate roll/pitch movement\n            "
                            },
              {
                "_name": "roll",
                "_type": "i8",
                "__text": "\n                Roll consign for the drone [-100;100]\n            "
                            },
              {
                "_name": "pitch",
                "_type": "i8",
                "__text": "\n                Pitch consign for the drone [-100;100]\n            "
                            },
              {
                "_name": "yaw",
                "_type": "i8",
                "__text": "\n                Yaw consign for the drone [-100;100]\n            "
                            },
              {
                "_name": "gaz",
                "_type": "i8",
                "__text": "\n                Gaz consign for the drone [-100;100]\n            "
                            },
              {
                "_name": "psi",
                "_type": "float",
                "__text": "\n                [NOT USED] - Magnetic north heading of the controlling device (deg) [-180;180]\n            "
                            }
                        ],
            "_name": "PCMD",
            "_buffer": "NON_ACK",
            "__text": "\n            Ask the drone to move around.\n            \n            \n\n            \n            \n\n            \n            \n\n            \n            \n\n            \n            \n\n            \n            \n\n        "
                    },
          {
            "_name": "Landing",
            "__text": "\n            Ask the drone to land\n        "
                    },
          {
            "_name": "Emergency",
            "_buffer": "HIGH_PRIO",
            "_timeout": "RETRY",
            "__text": "\n            Put drone in emergency user state\n        "
                    },
          {
            "arg": {
              "_name": "start",
              "_type": "u8",
              "__text": "\n                1 to start the navigate home, 0 to stop it\n            "
            },
            "_name": "NavigateHome",
            "__text": "\n            Ask the drone to fly to home\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "state",
              "_type": "u8",
              "__text": "\n                State of automatic take off mode (1 for autotake off enabled)\n            "
            },
            "_name": "AutoTakeOffMode",
            "__text": "\n            [NOT USED] Set Drone3 in automatic take off mode\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "dX",
                "_type": "float",
                "__text": "\n                Wanted displacement along the front axis [m]\n            "
                            },
              {
                "_name": "dY",
                "_type": "float",
                "__text": "\n                Wanted displacement along the right axis [m]\n            "
                            },
              {
                "_name": "dZ",
                "_type": "float",
                "__text": "\n                Wanted displacement along the down axis [m]\n            "
                            },
              {
                "_name": "dPsi",
                "_type": "float",
                "__text": "\n                Wanted rotation of heading  [rad]\n            "
                            }
                        ],
            "_name": "moveBy",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Move the drone to a relative position and rotate heading by a given angle\n            The frame is horizontal and relative to the current drone orientation:\n            - X is front\n            - Y is right\n            - Z is down\n            The movement settings of the device are those set for the autonomous flight.\n            \n\n            \n\n            \n\n            \n\n        "
                    }
                ],
        "_name": "Piloting",
        "_id": "0",
        "__text": "\n        All commands related to piloting the totoDrone\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n\n        \n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "front",
                "__text": "\n                    Flip direction front\n                "
                            },
              {
                "_name": "back",
                "__text": "\n                    Flip direction back\n                "
                            },
              {
                "_name": "right",
                "__text": "\n                    Flip direction right\n                "
                            },
              {
                "_name": "left",
                "__text": "\n                    Flip direction left\n                "
                            }
                        ],
            "_name": "direction",
            "_type": "enum",
            "__text": "\n                Direction for the flip\n                \n\n                \n\n                \n\n                \n\n            "
          },
          "_name": "Flip",
          "__text": "\n            Make a flip\n            \n\n        "
        },
        "_name": "Animations",
        "_id": "5",
        "__text": "\n        Animation commands\n        \n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "tilt",
              "_type": "i8",
              "__text": "\n                Tilt camera consign for the drone (in degree)\n                The value is saturated by the drone.\n                Saturation value is sent by thre drone through CameraSettingsChanged command.\n            "
                        },
            {
              "_name": "pan",
              "_type": "i8",
              "__text": "\n                Pan camera consign for the drone (in degree)\n                The value is saturated by the drone.\n                Saturation value is sent by thre drone through CameraSettingsChanged command.\n            "
                        }
                    ],
          "_name": "Orientation",
          "__text": "\n            Ask the drone to move camera.\n            \n            \n\n            \n            \n\n        "
        },
        "_name": "Camera",
        "_id": "1",
        "__text": "\n        Ask the drone to move camera\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "mass_storage_id",
              "_type": "u8",
              "__text": "\n                Mass storage id to take picture\n            "
            },
            "_name": "Picture",
            "__text": "\n            @deprecated\n            Take picture\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "stop",
                    "__text": "\n                    Stop the video recording\n                "
                                    },
                  {
                    "_name": "start",
                    "__text": "\n                    Start the video recording\n                "
                                    }
                                ],
                "_name": "record",
                "_type": "enum",
                "__text": "\n                Command to record video\n                \n\n                \n\n            "
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage id to record\n            "
                            }
                        ],
            "_name": "Video",
            "__text": "\n            @deprecated\n            Video record\n            \n\n            \n\n        "
                    },
          {
            "_name": "PictureV2",
            "__text": "\n            Take picture\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "stop",
                  "__text": "\n                    Stop the video recording\n                "
                                },
                {
                  "_name": "start",
                  "__text": "\n                    Start the video recording\n                "
                                }
                            ],
              "_name": "record",
              "_type": "enum",
              "__text": "\n                Command to record video\n                \n\n                \n\n            "
            },
            "_name": "VideoV2",
            "__text": "\n            Video record\n            \n\n        "
                    }
                ],
        "_name": "MediaRecord",
        "_id": "7",
        "__text": "\n        Media recording management\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "state",
                "_type": "u8",
                "__text": "\n                1 if picture has been taken, 0 otherwise\n            "
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage id where the picture was recorded\n            "
                            }
                        ],
            "_name": "PictureStateChanged",
            "__text": "\n            @deprecated\n            State of picture recording\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "stopped",
                    "__text": "\n                    Video was stopped\n                "
                                    },
                  {
                    "_name": "started",
                    "__text": "\n                    Video was started\n                "
                                    },
                  {
                    "_name": "failed",
                    "__text": "\n                    Video was failed\n                "
                                    },
                  {
                    "_name": "autostopped",
                    "__text": "\n                    Video was auto stopped\n                "
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "\n                State of video\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage id where the video was recorded\n            "
                            }
                        ],
            "_name": "VideoStateChanged",
            "__text": "\n            @deprecated\n            State of video recording\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "ready",
                    "__text": "\n                    The picture recording is ready\n                "
                                    },
                  {
                    "_name": "busy",
                    "__text": "\n                    The picture recording is busy\n                "
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "\n                    The picture recording is not available\n                "
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "\n                State of device picture recording\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "\n                    No Error\n                "
                                    },
                  {
                    "_name": "unknown",
                    "__text": "\n                    Unknown generic error\n                "
                                    },
                  {
                    "_name": "camera_ko",
                    "__text": "\n                    Picture camera is out of order\n                "
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "\n                    Memory full ; cannot save one additional picture\n                "
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "\n                    Battery is too low to start/keep recording.\n                "
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "\n                Error to explain the state \n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "PictureStateChangedV2",
            "__text": "\n            State of device picture recording changed\n            \n\n            \n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "stopped",
                    "__text": "\n                    Video is stopped\n                "
                                    },
                  {
                    "_name": "started",
                    "__text": "\n                    Video is started\n                "
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "\n                    The video recording is not available\n                "
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "\n                State of device video recording\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "\n                    No Error\n                "
                                    },
                  {
                    "_name": "unknown",
                    "__text": "\n                    Unknown generic error\n                "
                                    },
                  {
                    "_name": "camera_ko",
                    "__text": "\n                    Video camera is out of order\n                "
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "\n                    Memory full ; cannot save one additional video\n                "
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "\n                    Battery is too low to start/keep recording.\n                "
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "\n                Error to explain the state \n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "VideoStateChangedV2",
            "__text": "\n            State of device video recording changed\n            \n\n\n            \n\n        "
                    }
                ],
        "_name": "MediaRecordState",
        "_id": "8",
        "__text": "\n        State of media recording\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "taken",
                    "__text": "\n                    Picture taken and saved\n                "
                                    },
                  {
                    "_name": "failed",
                    "__text": "\n                    Picture failed\n                "
                                    }
                                ],
                "_name": "event",
                "_type": "enum",
                "__text": "\n                Last event of picture recording\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "\n                    No Error\n                "
                                    },
                  {
                    "_name": "unknown",
                    "__text": "\n                    Unknown generic error ; only when state is failed \n                "
                                    },
                  {
                    "_name": "busy",
                    "__text": "\n                    Picture recording is busy ; only when state is failed\n                "
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "\n                    Picture recording not available ; only when state is failed\n                "
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "\n                    Memory full ; only when state is failed\n                "
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "\n                    Battery is too low to record.\n                "
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "\n                Error to explain the event \n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "PictureEventChanged",
            "__text": "\n            Event of picture recording\n            \n\n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "start",
                    "__text": "\n                    Video start\n                "
                                    },
                  {
                    "_name": "stop",
                    "__text": "\n                    Video stop and saved\n                "
                                    },
                  {
                    "_name": "failed",
                    "__text": "\n                    Video failed\n                "
                                    }
                                ],
                "_name": "event",
                "_type": "enum",
                "__text": "\n                Event of video recording\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "ok",
                    "__text": "\n                    No Error\n                "
                                    },
                  {
                    "_name": "unknown",
                    "__text": "\n                    Unknown generic error ; only when state is failed\n                "
                                    },
                  {
                    "_name": "busy",
                    "__text": "\n                    Video recording is busy ; only when state is failed\n                "
                                    },
                  {
                    "_name": "notAvailable",
                    "__text": "\n                    Video recording not available ; only when state is failed\n                "
                                    },
                  {
                    "_name": "memoryFull",
                    "__text": "\n                    Memory full\n                "
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "\n                    Battery is too low to record.\n                "
                                    },
                  {
                    "_name": "autoStopped",
                    "__text": "\n                    Video was auto stopped\n                "
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "\n                Error to explain the event \n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "VideoEventChanged",
            "__text": "\n            Event of video recording\n            \n\n\n            \n\n        "
                    }
                ],
        "_name": "MediaRecordEvent",
        "_id": "3",
        "__text": "\n        Events of media recording\n        \n        \n\n        \n        \n\n        \n    "
            },
      {
        "cmd": [
          {
            "_name": "FlatTrimChanged",
            "__text": "\n            Drone acknowledges that flat trim was correctly processed\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "landed",
                  "__text": "\n                    Landed state\n                "
                                },
                {
                  "_name": "takingoff",
                  "__text": "\n                    Taking off state\n                "
                                },
                {
                  "_name": "hovering",
                  "__text": "\n                    Hovering state\n                "
                                },
                {
                  "_name": "flying",
                  "__text": "\n                    Flying state\n                "
                                },
                {
                  "_name": "landing",
                  "__text": "\n                    Landing state\n                "
                                },
                {
                  "_name": "emergency",
                  "__text": "\n                    Emergency state\n                "
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "\n                Drone flying state\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "FlyingStateChanged",
            "__text": "\n            Drone flying state changed\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "none",
                  "__text": "\n                    No alert\n                "
                                },
                {
                  "_name": "user",
                  "__text": "\n                    User emergency alert\n                "
                                },
                {
                  "_name": "cut_out",
                  "__text": "\n                    Cut out alert\n                "
                                },
                {
                  "_name": "critical_battery",
                  "__text": "\n                    Critical battery alert\n                "
                                },
                {
                  "_name": "low_battery",
                  "__text": "\n                    Low battery alert\n                "
                                },
                {
                  "_name": "too_much_angle",
                  "__text": "\n                    The angle of the drone is too high\n                "
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "\n                Drone alert state\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "AlertStateChanged",
            "__text": "\n            Drone alert state changed\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "available",
                    "__text": "\n                    Navigate home is available\n                "
                                    },
                  {
                    "_name": "inProgress",
                    "__text": "\n                    Navigate home is in progress\n                "
                                    },
                  {
                    "_name": "unavailable",
                    "__text": "\n                    Navigate home is not available\n                "
                                    },
                  {
                    "_name": "pending",
                    "__text": "\n                    Navigate home has been received, but its process is pending\n                "
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "\n                State of navigate home\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "userRequest",
                    "__text": "\n                    User requested a navigate home (available->inProgress)\n                "
                                    },
                  {
                    "_name": "connectionLost",
                    "__text": "\n                    Connection between controller and product lost (available->inProgress)\n                "
                                    },
                  {
                    "_name": "lowBattery",
                    "__text": "\n                    Low battery occurred (available->inProgress)\n                "
                                    },
                  {
                    "_name": "finished",
                    "__text": "\n                    Navigate home is finished (inProgress->available)\n                "
                                    },
                  {
                    "_name": "stopped",
                    "__text": "\n                    Navigate home has been stopped (inProgress->available)\n                "
                                    },
                  {
                    "_name": "disabled",
                    "__text": "\n                    Navigate home disabled by product (inProgress->unavailable or available->unavailable)\n                "
                                    },
                  {
                    "_name": "enabled",
                    "__text": "\n                    Navigate home enabled by product (unavailable->available)\n                "
                                    }
                                ],
                "_name": "reason",
                "_type": "enum",
                "__text": "\n                Reason of the state \n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "NavigateHomeStateChanged",
            "__text": "\n            Navigating home state\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "\n                Latitude position in decimal degrees (500.0 if not available)\n            "
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "\n                Longitude position in decimal degrees (500.0 if not available)\n            "
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "\n                Altitude in meters (from GPS)\n            "
                            }
                        ],
            "_name": "PositionChanged",
            "__text": "\n            Drone position changed\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "speedX",
                "_type": "float",
                "__text": "\n                Speed on the x axis (when drone moves forward, speed is > 0) (in m/s)\n            "
                            },
              {
                "_name": "speedY",
                "_type": "float",
                "__text": "\n                Speed on the y axis (when drone moves to right, speed is > 0) (in m/s)\n            "
                            },
              {
                "_name": "speedZ",
                "_type": "float",
                "__text": "\n                Speed on the z axis (when drone moves down, speed is > 0) (in m/s)\n            "
                            }
                        ],
            "_name": "SpeedChanged",
            "__text": "\n            Drone speed changed\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "roll",
                "_type": "float",
                "__text": "\n                roll value (in radian)\n            "
                            },
              {
                "_name": "pitch",
                "_type": "float",
                "__text": "\n                Pitch value (in radian)\n            "
                            },
              {
                "_name": "yaw",
                "_type": "float",
                "__text": "\n                Yaw value (in radian)\n            "
                            }
                        ],
            "_name": "AttitudeChanged",
            "__text": "\n            Drone attitude changed\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "state",
              "_type": "u8",
              "__text": "\n                State of automatic take off mode (1 if enabled)\n            "
            },
            "_name": "AutoTakeOffModeChanged",
            "__text": "\n            Status of the drone3 automatic take off mode\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "altitude",
              "_type": "double",
              "__text": "\n                Altitude in meters\n            "
            },
            "_name": "AltitudeChanged",
            "__text": "\n            Drone altitude changed\n            \n\n        "
                    }
                ],
        "_name": "PilotingState",
        "_id": "4",
        "__text": "\n        State from drone\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "dX",
              "_type": "float",
              "__text": "\n                Distance traveled along the front axis [m]\n            "
                        },
            {
              "_name": "dY",
              "_type": "float",
              "__text": "\n                Distance traveled along the right axis [m]\n            "
                        },
            {
              "_name": "dZ",
              "_type": "float",
              "__text": "\n                Distance traveled along the down axis [m]\n            "
                        },
            {
              "_name": "dPsi",
              "_type": "float",
              "__text": "\n                Applied angle on heading  [rad]\n            "
                        },
            {
              "enum": [
                {
                  "_name": "ok",
                  "__text": "\n                    No Error ; The relative displacement\n                "
                                },
                {
                  "_name": "unknown",
                  "__text": "\n                    Unknown generic error\n                "
                                },
                {
                  "_name": "busy",
                  "__text": "\n                    The Device is busy ; command moveBy ignored \n                "
                                },
                {
                  "_name": "notAvailable",
                  "__text": "\n                    Command moveBy is not available ; command moveBy ignored \n                "
                                },
                {
                  "_name": "interrupted",
                  "__text": "\n                    Command moveBy interrupted \n                "
                                }
                            ],
              "_name": "error",
              "_type": "enum",
              "__text": "\n                Error to explain the event \n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                        }
                    ],
          "_name": "moveByEnd",
          "__text": "\n            Draft: this command is not implemented yet by the firmware\n            End of relative displacement of the drone\n            The frame is horizontal and relative to the current drone orientation:\n            - X is front\n            - Y is right\n            - Z is down\n            \n\n            \n\n            \n\n            \n\n            \n\n        "
        },
        "_name": "PilotingEvent",
        "_id": "34",
        "__text": "\n        Events of Piloting\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "2_4ghz",
                  "__text": "\n                    2.4 GHz band\n                "
                                },
                {
                  "_name": "5ghz",
                  "__text": "\n                    5 GHz band\n                "
                                },
                {
                  "_name": "all",
                  "__text": "\n                    Both 2.4 and 5 GHz bands\n                "
                                }
                            ],
              "_name": "band",
              "_type": "enum",
              "__text": "\n                The band(s) : 2.4 Ghz, 5 Ghz, or both\n               \n\n                \n\n                \n\n            "
            },
            "_name": "WifiScan",
            "__text": "\n            Launches wifi network scan\n            \n\n        "
                    },
          {
            "_name": "WifiAuthChannel",
            "__text": "\n            Controller inquire the list of authorized wifi channels.\n        "
                    }
                ],
        "_name": "Network",
        "_id": "13",
        "__text": "\n        Network related commands\n        \n        \n\n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "ssid",
                "_type": "string",
                "__text": "\n                SSID of the AP\n            "
                            },
              {
                "_name": "rssi",
                "_type": "i16",
                "__text": "\n                RSSI of the AP in dbm (negative value)\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "2_4ghz",
                    "__text": "\n                    2.4 GHz band\n                "
                                    },
                  {
                    "_name": "5ghz",
                    "__text": "\n                    5 GHz band\n                "
                                    }
                                ],
                "_name": "band",
                "_type": "enum",
                "__text": "\n                The band : 2.4 GHz or 5 GHz\n                \n\n                \n\n            "
                            },
              {
                "_name": "channel",
                "_type": "u8",
                "__text": "\n                Channel of the AP\n            "
                            }
                        ],
            "_name": "WifiScanListChanged",
            "_listtype": "MAP",
            "__text": "\n            One scanning result found\n            \n\n            \n\n            \n\n            \n\n        "
                    },
          {
            "_name": "AllWifiScanChanged",
            "__text": "\n            State sent when all scanning result sent\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "2_4ghz",
                    "__text": "\n                    2.4 GHz band\n                "
                                    },
                  {
                    "_name": "5ghz",
                    "__text": "\n                    5 GHz band\n                "
                                    }
                                ],
                "_name": "band",
                "_type": "enum",
                "__text": "\n                The band of this channel : 2.4 GHz or 5 GHz\n                \n\n                \n\n            "
                            },
              {
                "_name": "channel",
                "_type": "u8",
                "__text": "\n                The authorized channel.\n            "
                            },
              {
                "_name": "in_or_out",
                "_type": "u8",
                "__text": "\n                Bit 0 is 1 if channel is authorized outside (0 otherwise) ; Bit 1 is 1 if channel is authorized inside (0 otherwise)\n            "
                            }
                        ],
            "_name": "WifiAuthChannelListChanged",
            "_listtype": "LIST",
            "__text": "\n            Notify of an Authorized Channel.\n            \n\n            \n\n            \n\n        "
                    },
          {
            "_name": "AllWifiAuthChannelChanged",
            "__text": "\n            Notify the end of the list of Authorized wifi Channel.\n        "
                    }
                ],
        "_name": "NetworkState",
        "_id": "14",
        "__text": "\n        Network state from Product\n        \n        \n\n        \n        \n\n\n        \n\n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "\n                Current altitude max in m\n            "
            },
            "_name": "MaxAltitude",
            "__text": "\n            Set Max Altitude\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "\n                Current tilt max in degree\n            "
            },
            "_name": "MaxTilt",
            "__text": "\n            Set Max Tilt\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "on",
              "_type": "u8",
              "__text": "\n                1 to enable, 0 to disable\n            "
            },
            "_name": "AbsolutControl",
            "__text": "\n            [NOT USED] Enable/Disable absolut control\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                Current max distance in meter\n            "
            },
            "_name": "MaxDistance",
            "__text": "\n            Set the distance max of the drone\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "shouldNotFlyOver",
              "_type": "u8",
              "__text": "\n                1 if the drone can't fly further than max distance, 0 if no limitation on the drone should be done\n            "
            },
            "_name": "NoFlyOverMaxDistance",
            "__text": "\n            Indication about how the product handle flying over the max distance limitation\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum horizontal speed [m/s]\n            "
            },
            "_name": "setAutonomousFlightMaxHorizontalSpeed",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Set the maximum horizontal speed used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum vertical speed [m/s]\n            "
            },
            "_name": "setAutonomousFlightMaxVerticalSpeed",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Set the maximum vertical speed used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum horizontal acceleration [m/s2]\n            "
            },
            "_name": "setAutonomousFlightMaxHorizontalAcceleration",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Set the maximum horizontal acceleration used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum vertical acceleration [m/s2]\n            "
            },
            "_name": "setAutonomousFlightMaxVerticalAcceleration",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Set the maximum vertical acceleration used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum yaw rotation speed [rad/s]\n            "
            },
            "_name": "setAutonomousFlightMaxRotationSpeed",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Set the maximum yaw rotation speed used by the autonomous flight\n            \n\n        "
                    }
                ],
        "_name": "PilotingSettings",
        "_id": "2",
        "__text": "\n        Piloting Settings commands\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "\n                Current altitude max\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Range min of altitude\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Range max of altitude\n            "
                            }
                        ],
            "_name": "MaxAltitudeChanged",
            "__text": "\n            Max Altitude sent by product\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "\n                Current max tilt\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Range min of tilt\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Range max of tilt\n            "
                            }
                        ],
            "_name": "MaxTiltChanged",
            "__text": "\n            Max tilt sent by product\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "on",
              "_type": "u8",
              "__text": "\n                1 if enabled, 0 if disabled\n            "
            },
            "_name": "AbsolutControlChanged",
            "__text": "\n            Absolut control boolean sent by product\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "\n                Current max distance in meter\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Minimal possible max distance\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Maximal possible max distance\n            "
                            }
                        ],
            "_name": "MaxDistanceChanged",
            "__text": "\n            Max distance sent by the drone\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "shouldNotFlyOver",
              "_type": "u8",
              "__text": "\n                1 if the drone won't fly further than max distance, 0 if no limitation on the drone will be done\n            "
            },
            "_name": "NoFlyOverMaxDistanceChanged",
            "__text": "\n            Indication about how the product handle flying over the max distance limitation\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum horizontal speed [m/s]\n            "
            },
            "_name": "AutonomousFlightMaxHorizontalSpeed",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Maximum horizontal speed used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum vertical speed [m/s]\n            "
            },
            "_name": "AutonomousFlightMaxVerticalSpeed",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Maximum vertical speed used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum horizontal acceleration [m/s2]\n            "
            },
            "_name": "AutonomousFlightMaxHorizontalAcceleration",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Maximum horizontal acceleration used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum vertical acceleration [m/s2]\n            "
            },
            "_name": "AutonomousFlightMaxVerticalAcceleration",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Maximum vertical acceleration used by the autonomous flight\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                maximum yaw rotation speed [rad/s]\n            "
            },
            "_name": "AutonomousFlightMaxRotationSpeed",
            "__text": "\n            Draft: this command is not implemented yet by the firmware\n            Maximum yaw rotation speed used by the autonomous flight\n            \n\n        "
                    }
                ],
        "_name": "PilotingSettingsState",
        "_id": "6",
        "__text": "\n        Piloting Settings state from product\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "\n                Current max vertical speed in m/s\n            "
            },
            "_name": "MaxVerticalSpeed",
            "__text": "\n            Set Max Vertical speed\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "current",
              "_type": "float",
              "__text": "\n                Current max rotation speed in degree/s\n            "
            },
            "_name": "MaxRotationSpeed",
            "__text": "\n            Set Max Rotation speed\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "present",
              "_type": "u8",
              "__text": "\n                1 if present, 0 if not present\n            "
            },
            "_name": "HullProtection",
            "__text": "\n            Presence of hull protection\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "outdoor",
              "_type": "u8",
              "__text": "\n                1 if outdoor flight, 0 if indoor flight\n            "
            },
            "_name": "Outdoor",
            "__text": "\n            Outdoor property\n            \n\n        "
                    }
                ],
        "_name": "SpeedSettings",
        "_id": "11",
        "__text": "\n        Speed Settings commands\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "\n                Current max vertical speed in m/s\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Range min of vertical speed\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Range max of vertical speed\n            "
                            }
                        ],
            "_name": "MaxVerticalSpeedChanged",
            "__text": "\n            Max vertical speed sent by product\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "current",
                "_type": "float",
                "__text": "\n                Current max rotation speed in degree/s\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Range min of rotation speed\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Range max of rotation speed\n            "
                            }
                        ],
            "_name": "MaxRotationSpeedChanged",
            "__text": "\n            Max rotation speed sent by product\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "present",
              "_type": "u8",
              "__text": "\n                1 if present, 0 if not present\n            "
            },
            "_name": "HullProtectionChanged",
            "__text": "\n            Presence of hull protection sent by product\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "outdoor",
              "_type": "u8",
              "__text": "\n                1 if outdoor flight, 0 if indoor flight\n            "
            },
            "_name": "OutdoorChanged",
            "__text": "\n            Outdoor property sent by product\n            \n\n        "
                    }
                ],
        "_name": "SpeedSettingsState",
        "_id": "12",
        "__text": "\n        Speed Settings state from product\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "\n                    Auto selection\n                "
                                },
                {
                  "_name": "manual",
                  "__text": "\n                    Manual selection\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of wifi selection (auto, manual)\n                \n\n                \n\n            "
                        },
            {
              "enum": [
                {
                  "_name": "2_4ghz",
                  "__text": "\n                    2.4 GHz band\n                "
                                },
                {
                  "_name": "5ghz",
                  "__text": "\n                    5 GHz band\n                "
                                },
                {
                  "_name": "all",
                  "__text": "\n                    Both 2.4 and 5 GHz bands\n                "
                                }
                            ],
              "_name": "band",
              "_type": "enum",
              "__text": "\n                The allowed band(s) : 2.4 Ghz, 5 Ghz, or all\n                \n\n                \n\n                \n\n            "
                        },
            {
              "_name": "channel",
              "_type": "u8",
              "__text": "\n                The channel (not used in auto mode)\n            "
                        }
                    ],
          "_name": "WifiSelection",
          "__text": "\n            Auto-select channel of choosen band\n            \n\n            \n\n            \n\n        "
        },
        "_name": "NetworkSettings",
        "_id": "9",
        "__text": "\n        Network settings commands\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "enum": [
                {
                  "_name": "auto_all",
                  "__text": "\n                    Auto selection\n                "
                                },
                {
                  "_name": "auto_2_4ghz",
                  "__text": "\n                    Auto selection 2.4ghz\n                "
                                },
                {
                  "_name": "auto_5ghz",
                  "__text": "\n                    Auto selection 5 ghz\n                "
                                },
                {
                  "_name": "manual",
                  "__text": "\n                    Manual selection\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of wifi selection settings\n                \n\n                \n\n                \n\n                \n\n            "
                        },
            {
              "enum": [
                {
                  "_name": "2_4ghz",
                  "__text": "\n                    2.4 GHz band\n                "
                                },
                {
                  "_name": "5ghz",
                  "__text": "\n                    5 GHz band\n                "
                                },
                {
                  "_name": "all",
                  "__text": "\n                    Both 2.4 and 5 GHz bands\n                "
                                }
                            ],
              "_name": "band",
              "_type": "enum",
              "__text": "\n                The actual  wifi band state\n                \n\n                \n\n                \n\n            "
                        },
            {
              "_name": "channel",
              "_type": "u8",
              "__text": "\n                The channel (depends of the band)\n            "
                        }
                    ],
          "_name": "WifiSelectionChanged",
          "__text": "\n            Wifi selection from product\n            \n\n            \n\n            \n\n        "
        },
        "_name": "NetworkSettingsState",
        "_id": "10",
        "__text": "\n        Network settings state from product\n        \n\n    "
            },
      {
        "_name": "Settings",
        "_id": "15",
        "__text": "\n        Settings commands\n    \n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "motor_number",
                "_type": "u8",
                "__text": "\n                Product Motor number\n            "
                            },
              {
                "_name": "type",
                "_type": "string",
                "__text": "\n                Product Motor type\n            "
                            },
              {
                "_name": "software",
                "_type": "string",
                "__text": "\n                Product Motors software version\n            "
                            },
              {
                "_name": "hardware",
                "_type": "string",
                "__text": "\n                Product Motors hardware version\n            "
                            }
                        ],
            "_name": "ProductMotorVersionListChanged",
            "_listtype": "MAP",
            "__text": "\n            DEPRECATED Product Motor version (the first argument is the unique identifier for the list)\n            \n\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "software",
                "_type": "string",
                "__text": "\n                Product GPS software version\n            "
                            },
              {
                "_name": "hardware",
                "_type": "string",
                "__text": "\n                Product GPS hardware version\n            "
                            }
                        ],
            "_name": "ProductGPSVersionChanged",
            "__text": "\n            Product GPS versions\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "motorIds",
                "_type": "u8",
                "__text": "\n                Bit field for concerned motor. If bit 0 = 1, motor 1 is affected by this error. Same with bit 1, 2 and 3.\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "noError",
                    "__text": "\n                    No error detected\n                "
                                    },
                  {
                    "_name": "errorEEPRom",
                    "__text": "\n                    EEPROM access failure\n                "
                                    },
                  {
                    "_name": "errorMotorStalled",
                    "__text": "\n                    Motor stalled \n                "
                                    },
                  {
                    "_name": "errorPropellerSecurity",
                    "__text": "\n                    Propeller cutout security triggered\n                "
                                    },
                  {
                    "_name": "errorCommLost",
                    "__text": "\n                    Communication with motor failed by timeout\n                "
                                    },
                  {
                    "_name": "errorRCEmergencyStop",
                    "__text": "\n                    RC emergency stop\n                "
                                    },
                  {
                    "_name": "errorRealTime",
                    "__text": "\n                    Motor controler scheduler real-time out of bounds\n                "
                                    },
                  {
                    "_name": "errorMotorSetting",
                    "__text": "\n                    One or several incorrect values in motor settings\n                "
                                    },
                  {
                    "_name": "errorTemperature",
                    "__text": "\n                    Too hot or too cold Cypress temperature\n                "
                                    },
                  {
                    "_name": "errorBatteryVoltage",
                    "__text": "\n                    Battery voltage out of bounds\n                "
                                    },
                  {
                    "_name": "errorLipoCells",
                    "__text": "\n                    Incorrect number of LIPO cells\n                "
                                    },
                  {
                    "_name": "errorMOSFET",
                    "__text": "\n                    Defectuous MOSFET or broken motor phases\n                "
                                    },
                  {
                    "_name": "errorBootloader",
                    "__text": "\n                    Not use for BLDC but useful for HAL\n                "
                                    },
                  {
                    "_name": "errorAssert",
                    "__text": "\n                    Error Made by BLDC_ASSERT()\n                "
                                    }
                                ],
                "_name": "motorError",
                "_type": "enum",
                "__text": "\n                Enumeration of the motor error\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "MotorErrorStateChanged",
            "__text": "\n            Motor status changed\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "\n                name of the version : dot separated fields (major version - minor version - firmware type - nb motors handled). Firmware types : Release, Debug, Alpha, Test-bench\n            "
            },
            "_name": "MotorSoftwareVersionChanged",
            "__text": "\n            Motor software version status\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "nbFlights",
                "_type": "u16",
                "__text": "\n                total number of flights\n            "
                            },
              {
                "_name": "lastFlightDuration",
                "_type": "u16",
                "__text": "\n                Duration of the last flight (in seconds)\n            "
                            },
              {
                "_name": "totalFlightDuration",
                "_type": "u32",
                "__text": "\n                Duration of all flights (in seconds)\n            "
                            }
                        ],
            "_name": "MotorFlightsStatusChanged",
            "__text": "\n            Motor flights status\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "noError",
                  "__text": "\n                    No error detected\n                "
                                },
                {
                  "_name": "errorEEPRom",
                  "__text": "\n                    EEPROM access failure\n                "
                                },
                {
                  "_name": "errorMotorStalled",
                  "__text": "\n                    Motor stalled\n                "
                                },
                {
                  "_name": "errorPropellerSecurity",
                  "__text": "\n                    Propeller cutout security triggered\n                "
                                },
                {
                  "_name": "errorCommLost",
                  "__text": "\n                    Communication with motor failed by timeout\n                "
                                },
                {
                  "_name": "errorRCEmergencyStop",
                  "__text": "\n                    RC emergency stop\n                "
                                },
                {
                  "_name": "errorRealTime",
                  "__text": "\n                    Motor controler scheduler real-time out of bounds\n                "
                                },
                {
                  "_name": "errorMotorSetting",
                  "__text": "\n                    One or several incorrect values in motor settings\n                "
                                },
                {
                  "_name": "errorBatteryVoltage",
                  "__text": "\n                    Battery voltage out of bounds\n                "
                                },
                {
                  "_name": "errorLipoCells",
                  "__text": "\n                    Incorrect number of LIPO cells\n                "
                                },
                {
                  "_name": "errorMOSFET",
                  "__text": "\n                    Defectuous MOSFET or broken motor phases\n                "
                                },
                {
                  "_name": "errorTemperature",
                  "__text": "\n                    Too hot or too cold Cypress temperature\n                "
                                },
                {
                  "_name": "errorBootloader",
                  "__text": "\n                    Not use for BLDC but useful for HAL\n                "
                                },
                {
                  "_name": "errorAssert",
                  "__text": "\n                    Error Made by BLDC_ASSERT()\n                "
                                }
                            ],
              "_name": "motorError",
              "_type": "enum",
              "__text": "\n                Enumeration of the motor error\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "MotorErrorLastErrorChanged",
            "__text": "\n            Motor status about last error\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "serialID",
              "_type": "string",
              "__text": "\n                Product P7ID\n            "
            },
            "_name": "P7ID",
            "__text": "\n            Product P7ID\n            \n\n        "
                    }
                ],
        "_name": "SettingsState",
        "_id": "16",
        "__text": "\n        Settings state from product\n\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "_name": "DirectorMode",
        "_id": "17",
        "__text": "\n        Director mode commands\n        \n    "
            },
      {
        "_name": "DirectorModeState",
        "_id": "18",
        "__text": "\n        Director mode state from product\n    \n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "raw",
                  "__text": "\n                    Take raw image\n                "
                                },
                {
                  "_name": "jpeg",
                  "__text": "\n                    Take a 4:3 jpeg photo\n                "
                                },
                {
                  "_name": "snapshot",
                  "__text": "\n                    Take a 16:9 snapshot from camera\n                "
                                },
                {
                  "_name": "jpeg_fisheye",
                  "__text": "\n                    Take jpeg fisheye image only\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of photo format\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "PictureFormatSelection",
            "__text": "\n            The format of the photo\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "\n                    Auto guess of best white balance params\n                "
                                },
                {
                  "_name": "tungsten",
                  "__text": "\n                    Tungsten white balance\n                "
                                },
                {
                  "_name": "daylight",
                  "__text": "\n                    Daylight white balance\n                "
                                },
                {
                  "_name": "cloudy",
                  "__text": "\n                    Cloudy white balance\n                "
                                },
                {
                  "_name": "cool_white",
                  "__text": "\n                    White balance for a flash\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type auto white balance\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "AutoWhiteBalanceSelection",
            "__text": "\n            AutoWhiteBalance mode\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                Exposition value (bounds given by ExpositionChanged arg min and max, by default [-3:3])\n            "
            },
            "_name": "ExpositionSelection",
            "__text": "\n            The exposition of the image\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "value",
              "_type": "float",
              "__text": "\n                Saturation value (bounds given by SaturationChanged arg min and max, by default [-100:100])\n            "
            },
            "_name": "SaturationSelection",
            "__text": "\n            The saturation of the image\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "\n                1 if timelapse is enabled, 0 otherwise\n            "
                            },
              {
                "_name": "interval",
                "_type": "float",
                "__text": "\n                interval in seconds for taking pictures\n            "
                            }
                        ],
            "_name": "TimelapseSelection",
            "__text": "\n            Picture taken periodically\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "\n                1 if video autorecord is enabled, 0 otherwise\n            "
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage id to take video\n            "
                            }
                        ],
            "_name": "VideoAutorecordSelection",
            "__text": "\n            Video autorecord\n            \n\n            \n\n        "
                    }
                ],
        "_name": "PictureSettings",
        "_id": "19",
        "__text": "\n        Photo settings chosen by the user\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "raw",
                  "__text": "\n                    Take raw image\n                "
                                },
                {
                  "_name": "jpeg",
                  "__text": "\n                    Take a 4:3 jpeg photo\n                "
                                },
                {
                  "_name": "snapshot",
                  "__text": "\n                    Take a 16:9 snapshot from camera\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of photo format\n                \n\n                \n\n                \n\n            "
            },
            "_name": "PictureFormatChanged",
            "__text": "\n        The format of the photo\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "\n                    Auto guess of best white balance params\n                "
                                },
                {
                  "_name": "tungsten",
                  "__text": "\n                    Tungsten white balance\n                "
                                },
                {
                  "_name": "daylight",
                  "__text": "\n                    Daylight white balance\n                "
                                },
                {
                  "_name": "cloudy",
                  "__text": "\n                    Cloudy white balance\n                "
                                },
                {
                  "_name": "cool_white",
                  "__text": "\n                    White balance for a flash\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type auto white balance\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "AutoWhiteBalanceChanged",
            "__text": "\n            AutoWhiteBalance mode\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "value",
                "_type": "float",
                "__text": "\n                Exposition value\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Min exposition value\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Max exposition value\n            "
                            }
                        ],
            "_name": "ExpositionChanged",
            "__text": "\n            The exposition of the image\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "value",
                "_type": "float",
                "__text": "\n                Saturation value\n            "
                            },
              {
                "_name": "min",
                "_type": "float",
                "__text": "\n                Min saturation value\n            "
                            },
              {
                "_name": "max",
                "_type": "float",
                "__text": "\n                Max saturation value\n            "
                            }
                        ],
            "_name": "SaturationChanged",
            "__text": "\n            The saturation of the image\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "\n                1 if timelapse is enabled, 0 otherwise\n            "
                            },
              {
                "_name": "interval",
                "_type": "float",
                "__text": "\n                interval in seconds for taking pictures\n            "
                            },
              {
                "_name": "minInterval",
                "_type": "float",
                "__text": "\n                Minimal interval for taking pictures\n            "
                            },
              {
                "_name": "maxInterval",
                "_type": "float",
                "__text": "\n                Maximal interval for taking pictures\n            "
                            }
                        ],
            "_name": "TimelapseChanged",
            "__text": "\n            Picture taken periodically\n            \n\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "enabled",
                "_type": "u8",
                "__text": "\n                1 if video autorecord is enabled, 0 otherwise\n            "
                            },
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage id for the taken video\n            "
                            }
                        ],
            "_name": "VideoAutorecordChanged",
            "__text": "\n            Video autorecord\n            \n\n            \n\n        "
                    }
                ],
        "_name": "PictureSettingsState",
        "_id": "20",
        "__text": "\n        Photo settings state from product\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "enable",
            "_type": "u8",
            "__text": "\n                1 to enable, 0 to disable.\n            "
          },
          "_name": "VideoEnable",
          "__text": "\n            Enable/disable video streaming.\n            \n\n        "
        },
        "_name": "MediaStreaming",
        "_id": "21",
        "__text": "\n        Control media streaming behavior.\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "enabled",
                "__text": "\n                    Video streaming is enabled.\n                "
                            },
              {
                "_name": "disabled",
                "__text": "\n                    Video streaming is disabled.\n                "
                            },
              {
                "_name": "error",
                "__text": "\n                    Video streaming failed to start.\n                "
                            }
                        ],
            "_name": "enabled",
            "_type": "enum",
            "__text": "\n                Current video streaming status.\n                \n\n                \n\n                \n\n            "
          },
          "_name": "VideoEnableChanged",
          "__text": "\n            Return video streaming status.\n            \n\n        "
        },
        "_name": "MediaStreamingState",
        "_id": "22",
        "__text": "\n        Media streaming status.\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "\n                Home latitude in decimal degrees\n            "
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "\n                Home longitude in decimal degrees\n            "
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "\n                Home altitude in meters\n            "
                            }
                        ],
            "_name": "SetHome",
            "__text": "\n            Set home location\n            \n\n            \n\n            \n\n        "
                    },
          {
            "_name": "ResetHome",
            "__text": "\n            Reset home location and let the drone make its own home\n        "
                    },
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "\n                GPS latitude in decimal degrees\n            "
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "\n                GPS longitude in decimal degrees\n            "
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "\n                GPS altitude in meters\n            "
                            },
              {
                "_name": "horizontalAccuracy",
                "_type": "double",
                "__text": "\n                Horizontal Accuracy in meter ; equal -1 if no horizontal Accuracy\n            "
                            },
              {
                "_name": "verticalAccuracy",
                "_type": "double",
                "__text": "\n                Vertical Accuracy in meter ; equal -1 if no vertical Accuracy\n            "
                            }
                        ],
            "_name": "SendControllerGPS",
            "__text": "\n            send controller GPS location\n            \n\n            \n\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "TAKEOFF",
                  "__text": "\n                    The drone will try to return to the take off position\n                "
                                },
                {
                  "_name": "PILOT",
                  "__text": "\n                    The drone will try to return to the pilot position\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of the home position\n                \n\n                \n\n            "
            },
            "_name": "HomeType",
            "__text": "\n            Set user preference for the type of the home position. Note that this is only a preference\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "delay",
              "_type": "u16",
              "__text": "\n                Delay in second\n            "
            },
            "_name": "ReturnHomeDelay",
            "__text": "\n            Set the delay after which the drone will automatically try to return home\n            \n\n        "
                    }
                ],
        "_name": "GPSSettings",
        "_id": "23",
        "__text": "\n        GPS settings\n        \n\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "\n                Home latitude in decimal degrees\n            "
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "\n                Home longitude in decimal degrees\n            "
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "\n                Home altitude in meters\n            "
                            }
                        ],
            "_name": "HomeChanged",
            "__text": "\n            Return home status\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "latitude",
                "_type": "double",
                "__text": "\n                Home latitude in decimal degrees\n            "
                            },
              {
                "_name": "longitude",
                "_type": "double",
                "__text": "\n                Home longitude in decimal degrees\n            "
                            },
              {
                "_name": "altitude",
                "_type": "double",
                "__text": "\n                Home altitude in meters\n            "
                            }
                        ],
            "_name": "ResetHomeChanged",
            "__text": "\n            Reset home status\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "fixed",
              "_type": "u8",
              "__text": "\n                1 if gps on drone is fixed, 0 otherwise\n            "
            },
            "_name": "GPSFixStateChanged",
            "__text": "\n            GPS fix state\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "updated",
                  "__text": "\n                    Drone GPS update succeed\n                "
                                },
                {
                  "_name": "inProgress",
                  "__text": "\n                    Drone GPS update In progress\n                "
                                },
                {
                  "_name": "failed",
                  "__text": "\n                    Drone GPS update failed\n                "
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "\n                The state of the gps update\n                \n\n                \n\n                \n\n            "
            },
            "_name": "GPSUpdateStateChanged",
            "__text": "\n            GPS update state\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "TAKEOFF",
                  "__text": "\n                    The drone will try to return to the take off position\n                "
                                },
                {
                  "_name": "PILOT",
                  "__text": "\n                    The drone will try to return to the pilot position\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of the home position\n                \n\n                \n\n            "
            },
            "_name": "HomeTypeChanged",
            "__text": "\n            State of the type of the home position. This type is the user preference. The prefered home type may not be available, see HomeTypeStatesChanged to get the drone home type.\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "delay",
              "_type": "u16",
              "__text": "\n                Delay in second\n            "
            },
            "_name": "ReturnHomeDelayChanged",
            "__text": "\n            State of the delay after which the drone will automatically try to return home\n            \n\n        "
                    }
                ],
        "_name": "GPSSettingsState",
        "_id": "24",
        "__text": "\n        GPS settings state\n        \n\n        \n\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "tilt",
                "_type": "i8",
                "__text": "\n                Tilt camera consign for the drone [-100;100]\n            "
                            },
              {
                "_name": "pan",
                "_type": "i8",
                "__text": "\n                Pan camera consign for the drone [-100;100]\n            "
                            }
                        ],
            "_name": "Orientation",
            "__text": "\n            Camera orientation\n            \n            \n\n            \n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "tilt",
                "_type": "i8",
                "__text": "\n                Tilt value (in degree)\n            "
                            },
              {
                "_name": "pan",
                "_type": "i8",
                "__text": "\n                Pan value (in degree)\n            "
                            }
                        ],
            "_name": "defaultCameraOrientation",
            "__text": "\n            Orientation of the camera center.\n            This is the value to send when we want to center the camera.\n            \n\n            \n\n        "
                    }
                ],
        "_name": "CameraState",
        "_id": "25",
        "__text": "\n        Camera state\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "fiftyHertz",
                  "__text": "\n                    Electric frequency of the country is 50hz\n                "
                                },
                {
                  "_name": "sixtyHertz",
                  "__text": "\n                    Electric frequency of the country is 60hz\n                "
                                }
                            ],
              "_name": "frequency",
              "_type": "enum",
              "__text": "\n                Type of the electric frequency\n                \n\n                \n\n            "
            },
            "_name": "electricFrequency",
            "__text": "\n            Electric frequency of the country determined by the position of the controller\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "\n                    Anti flickering based on the electric frequency previously sent\n                "
                                },
                {
                  "_name": "FixedFiftyHertz",
                  "__text": "\n                    Anti flickering based on a fixed frequency of 50Hz\n                "
                                },
                {
                  "_name": "FixedSixtyHertz",
                  "__text": "\n                    Anti flickering based on a fixed frequency of 60Hz\n                "
                                }
                            ],
              "_name": "mode",
              "_type": "enum",
              "__text": "\n                Mode of the anti flickering functionnality\n                \n\n                \n\n                \n\n            "
            },
            "_name": "setMode",
            "__text": "\n            Set the anti flickering mode\n            \n\n        "
                    }
                ],
        "_name": "Antiflickering",
        "_id": "29",
        "__text": "\n        Anti-flickering related commands\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "fiftyHertz",
                  "__text": "\n                    Electric frequency of the country is 50hz\n                "
                                },
                {
                  "_name": "sixtyHertz",
                  "__text": "\n                    Electric frequency of the country is 60hz\n                "
                                }
                            ],
              "_name": "frequency",
              "_type": "enum",
              "__text": "\n                Type of the electric frequency\n                \n\n                \n\n            "
            },
            "_name": "electricFrequencyChanged",
            "__text": "\n            Electric frequency of the country determined by the position of the controller\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "auto",
                  "__text": "\n                    Anti flickering based on the electric frequency previously sent\n                "
                                },
                {
                  "_name": "FixedFiftyHertz",
                  "__text": "\n                    Anti flickering based on a fixed frequency of 50Hz\n                "
                                },
                {
                  "_name": "FixedSixtyHertz",
                  "__text": "\n                    Anti flickering based on a fixed frequency of 60Hz\n                "
                                }
                            ],
              "_name": "mode",
              "_type": "enum",
              "__text": "\n                Mode of the anti flickering functionnality\n                \n\n                \n\n                \n\n            "
            },
            "_name": "modeChanged",
            "__text": "\n            Anti flickering mode\n            \n\n        "
                    }
                ],
        "_name": "AntiflickeringState",
        "_id": "30",
        "__text": "\n        Anti-flickering related states\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "numberOfSatellite",
              "_type": "u8",
              "__text": "\n                The number of satellite\n            "
            },
            "_name": "NumberOfSatelliteChanged",
            "__text": "\n            The number of satellite used to compute the gps position\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "TAKEOFF",
                    "__text": "\n                    The drone will try to return to the take off position\n                "
                                    },
                  {
                    "_name": "PILOT",
                    "__text": "\n                    The drone will try to return to the pilot position\n                "
                                    },
                  {
                    "_name": "FIRST_FIX",
                    "__text": "\n                    The drone has not enough information, it will try to return to the first GPS fix\n                "
                                    }
                                ],
                "_name": "type",
                "_type": "enum",
                "__text": "\n                The type of the return home\n                \n\n                \n\n                \n\n            "
                            },
              {
                "_name": "available",
                "_type": "u8",
                "__text": "\n                1 if this type is available, 0 otherwise\n            "
                            }
                        ],
            "_name": "HomeTypeAvailabilityChanged",
            "_listtype": "MAP",
            "__text": "\n            Availability of the return home types in a map : for each type other args will be sent by the drone\n            \n\n            \n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "TAKEOFF",
                  "__text": "\n                    The drone will try to return to the take off position\n                "
                                },
                {
                  "_name": "PILOT",
                  "__text": "\n                    The drone will try to return to the pilot position\n                "
                                },
                {
                  "_name": "FIRST_FIX",
                  "__text": "\n                    The drone has not enough information, it will try to return to the first GPS fix\n                "
                                }
                            ],
              "_name": "type",
              "_type": "enum",
              "__text": "\n                The type of the return home chosen\n                \n\n                \n\n                \n\n            "
            },
            "_name": "HomeTypeChosenChanged",
            "__text": "\n            The return home type chosen\n            \n\n        "
                    }
                ],
        "_name": "GPSState",
        "_id": "31",
        "__text": "\n        GPS related States\n        \n\n        \n\n        \n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "features",
            "_type": "u64",
            "__text": "\n\t\t  Bitfield representing enabled features.\n\t\t  Currently supported bits are:\n\t\t  - 0 : 720p streaming\n\t\t  - 1 : No interface on SkyController HDMI\n\t\t"
          },
          "_name": "Features",
          "__text": "\n\t\tFeatures enabled\n\t\t\n\n\t  "
        },
        "_name": "PROState",
        "_id": "32",
        "__text": "\n\t  Pro features enabled on the Bebop\n\t  \n\n\t"
            }
        ],
    "_id": "1"
    },
  {
    "class": [
      {
        "cmd": {
          "_name": "Disconnect",
          "__text": "\n            Signals the remote that the host will disconnect and close its\n            libARNetwork instance (and all threads that use libARNetwork)\n        "
        },
        "_name": "Network",
        "_id": "0",
        "__text": "\n        Network related commands\n        \n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "off_button",
                "__text": "\n                    The button off has been pressed\n                "
                            },
              {
                "_name": "unknown",
                "__text": "\n                    Unknown generic cause\n                "
                            }
                        ],
            "_name": "cause",
            "_type": "enum",
            "__text": "\n                Cause of the disconnection of the product\n                \n\n                \n\n            "
          },
          "_name": "Disconnection",
          "__text": "\n            Signals the remote that the host will disconnect and close its\n            libARNetwork instance (and all threads that use libARNetwork)\n            \n\n        "
        },
        "_name": "NetworkEvent",
        "_id": "1",
        "__text": "\n        Network Event from product\n        \n        \n\n\n    "
            },
      {
        "cmd": [
          {
            "_name": "AllSettings",
            "_timeout": "RETRY",
            "__text": "\n            Get all product settings, the product must send all settings\n        "
                    },
          {
            "_name": "Reset",
            "__text": "\n            Reset all settings\n        "
                    },
          {
            "arg": {
              "_name": "name",
              "_type": "string",
              "__text": "\n                Product name\n            "
            },
            "_name": "ProductName",
            "__text": "\n            Set Product name\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "code",
              "_type": "string",
              "__text": "\n                Country code with ISO 3166 format\n            "
            },
            "_name": "Country",
            "__text": "\n            Set current Country of controller\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "automatic",
              "_type": "u8",
              "__text": "\n                Boolean : 0 : Manual / 1 : Auto\n            "
            },
            "_name": "AutoCountry",
            "__text": "\n            Set Auto Country Settings\n            \n\n        "
                    }
                ],
        "_name": "Settings",
        "_id": "2",
        "__text": "\n        Settings commands\n        \n\n        \n\n        \n\n\n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "_name": "AllSettingsChanged",
            "__text": "\n            State sent when all settings has been sent.\n        "
                    },
          {
            "_name": "ResetChanged",
            "__text": "\n            State sent when all settings has been resetting.\n        "
                    },
          {
            "arg": {
              "_name": "name",
              "_type": "string",
              "__text": "\n                Product name\n            "
            },
            "_name": "ProductNameChanged",
            "__text": "\n            Product name \n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "software",
                "_type": "string",
                "__text": "\n                Product software version\n            "
                            },
              {
                "_name": "hardware",
                "_type": "string",
                "__text": "\n                Product hardware version\n            "
                            }
                        ],
            "_name": "ProductVersionChanged",
            "__text": "\n            Product versions\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "high",
              "_type": "string",
              "__text": "\n                Serial high number (hexadecimal value)\n            "
            },
            "_name": "ProductSerialHighChanged",
            "__text": "\n            Product serial number\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "low",
              "_type": "string",
              "__text": "\n                Serial low number (hexadecimal value)\n            "
            },
            "_name": "ProductSerialLowChanged",
            "__text": "\n            Product serial number\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "code",
              "_type": "string",
              "__text": "\n                Country code with ISO 3166 format, empty string means unknown country.\n            "
            },
            "_name": "CountryChanged",
            "__text": "\n            Inform current Country set in product. (Answer to 'Country' command)\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "automatic",
              "_type": "u8",
              "__text": "\n                Boolean : 0 : Manual / 1 : Auto\n            "
            },
            "_name": "AutoCountryChanged",
            "__text": "\n            Inform Auto Country Settings\n            \n\n        "
                    }
                ],
        "_name": "SettingsState",
        "_id": "3",
        "__text": "\n        Settings state from product\n        \n\n        \n        \n\n\n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n\n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "_name": "AllStates",
            "_timeout": "RETRY",
            "__text": "\n            Get all product states.\n        "
                    },
          {
            "arg": {
              "_name": "date",
              "_type": "string",
              "__text": "\n                Date with ISO-8601 format\n            "
            },
            "_name": "CurrentDate",
            "__text": "\n            Set current date of controller\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "time",
              "_type": "string",
              "__text": "\n                Time with ISO-8601 format\n            "
            },
            "_name": "CurrentTime",
            "__text": "\n            Set current time of controller\n            \n\n        "
                    },
          {
            "_name": "Reboot",
            "__text": "\n            Command to ask reboot to product\n        "
                    }
                ],
        "_name": "Common",
        "_id": "4",
        "__text": "\n        Common commands\n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "_name": "AllStatesChanged",
            "__text": "\n            State sent when all product states has been sent.\n        "
                    },
          {
            "arg": {
              "_name": "percent",
              "_type": "u8",
              "__text": "\n                Battery percentage\n            "
            },
            "_name": "BatteryStateChanged",
            "__text": "\n            Battery state\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage id (unique)\n            "
                            },
              {
                "_name": "name",
                "_type": "string",
                "__text": "\n                Mass storage name\n            "
                            }
                        ],
            "_name": "MassStorageStateListChanged",
            "_listtype": "MAP",
            "__text": "\n            Mass storage state list\n            \n\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "mass_storage_id",
                "_type": "u8",
                "__text": "\n                Mass storage state id (unique)\n            "
                            },
              {
                "_name": "size",
                "_type": "u32",
                "__text": "\n                Mass storage size in MBytes\n            "
                            },
              {
                "_name": "used_size",
                "_type": "u32",
                "__text": "\n                Mass storage used size in MBytes\n            "
                            },
              {
                "_name": "plugged",
                "_type": "u8",
                "__text": "\n                Mass storage plugged (1 if mass storage is plugged, otherwise 0)\n            "
                            },
              {
                "_name": "full",
                "_type": "u8",
                "__text": "\n                Mass storage full information state (1 if mass storage full, 0 otherwise).\n            "
                            },
              {
                "_name": "internal",
                "_type": "u8",
                "__text": "\n                Mass storage internal type state (1 if mass storage is internal, 0 otherwise)\n            "
                            }
                        ],
            "_name": "MassStorageInfoStateListChanged",
            "_listtype": "MAP",
            "__text": "\n            Mass storage info state list\n            \n\n            \n\n            \n\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "date",
              "_type": "string",
              "__text": "\n                Date with ISO-8601 format\n            "
            },
            "_name": "CurrentDateChanged",
            "__text": "\n            Current date state\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "time",
              "_type": "string",
              "__text": "\n                Time with ISO-8601 format\n            "
            },
            "_name": "CurrentTimeChanged",
            "__text": "\n            Current time state\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "free_space",
                "_type": "u32",
                "__text": "\n                Mass storage free space in MBytes\n            "
                            },
              {
                "_name": "rec_time",
                "_type": "u16",
                "__text": "\n                Mass storage record time reamining in minute\n            "
                            },
              {
                "_name": "photo_remaining",
                "_type": "u32",
                "__text": "\n                Mass storage photo remaining\n            "
                            }
                        ],
            "_name": "MassStorageInfoRemainingListChanged",
            "_listtype": "LIST",
            "__text": "\n            Mass storage info remaining list\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "rssi",
              "_type": "i16",
              "__text": "\n                RSSI of the signal between controller and the product (in dbm)\n            "
            },
            "_name": "WifiSignalChanged",
            "__text": "\n            Wifi Signal between controller and product state\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "IMU",
                    "__text": "\n                    Inertial Measurement Unit sensor\n                "
                                    },
                  {
                    "_name": "barometer",
                    "__text": "\n                    Barometer sensor\n                "
                                    },
                  {
                    "_name": "ultrasound",
                    "__text": "\n                    Ultrasonic sensor\n                "
                                    },
                  {
                    "_name": "GPS",
                    "__text": "\n                    GPS sensor\n                "
                                    },
                  {
                    "_name": "magnetometer",
                    "__text": "\n                    Magnetometer sensor\n                "
                                    },
                  {
                    "_name": "vertical_camera",
                    "__text": "\n                    Vertical Camera sensor\n                "
                                    }
                                ],
                "_name": "sensorName",
                "_type": "enum",
                "__text": "\n                Sensor name\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "_name": "sensorState",
                "_type": "u8",
                "__text": "\n                Sensor state (1 if the sensor is OK, 0 if the sensor is NOT OK)\n            "
                            }
                        ],
            "_name": "SensorsStatesListChanged",
            "_listtype": "MAP",
            "__text": "\n            Sensors states list\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "RS_TRAVIS",
                  "__text": "\n                    Travis (RS taxi) model.\n                "
                                },
                {
                  "_name": "RS_MARS",
                  "__text": "\n                    Mars (RS space) model\n                "
                                },
                {
                  "_name": "RS_SWAT",
                  "__text": "\n                   SWAT (RS SWAT) model\n                "
                                },
                {
                  "_name": "RS_MCLANE",
                  "__text": "\n                    Mc Lane (RS police) model\n                "
                                },
                {
                  "_name": "RS_BLAZE",
                  "__text": "\n                    Blaze (RS fire) model\n                "
                                },
                {
                  "_name": "RS_ORAK",
                  "__text": "\n                    Orak (RS carbon hydrofoil) model\n                "
                                },
                {
                  "_name": "RS_NEWZ",
                  "__text": "\n                    New Z (RS wooden hydrofoil) model\n                "
                                },
                {
                  "_name": "JS_MARSHALL",
                  "__text": "\n                    Marshall (JS fire) model\n                "
                                },
                {
                  "_name": "JS_DIESEL",
                  "__text": "\n                    Diesel (JS SWAT) model\n                "
                                },
                {
                  "_name": "JS_BUZZ",
                  "__text": "\n                    Buzz (JS space) model\n                "
                                },
                {
                  "_name": "JS_MAX",
                  "__text": "\n                    Max (JS F1) model\n                "
                                },
                {
                  "_name": "JS_JETT",
                  "__text": "\n                    Jett (JS flames) model\n                "
                                },
                {
                  "_name": "JS_TUKTUK",
                  "__text": "\n                    Tuk-Tuk (JS taxi) model\n                "
                                }
                            ],
              "_name": "model",
              "_type": "enum",
              "__text": "\n                The Model of the product.\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "ProductModel",
            "__text": "\n            Inform of the product model. This is used to customize the UI depending on the connected product.\n            \n\n        "
                    },
          {
            "arg": [
              {
                "_name": "listFlags",
                "_type": "u8",
                "__text": "\n                List entry attribute Bitfield.\n                0x01: First: indicate it's the first element of the list. \n                0x02: Last:  indicate it's the last element of the list.\n                0x04: Empty: indicate the list is empty (implies First/Last). All other arguments should be ignored.\n           "
                            },
              {
                "_name": "countryCodes",
                "_type": "string",
                "__text": "\n                Following of country code with ISO 3166 format, separated by \";\". Be careful of the command size allowed by the network used. If necessary, split the list in several commands.\n            "
                            }
                        ],
            "_name": "CountryListKnown",
            "_listtype": "LIST",
            "__text": "\n            List of the countries known by the device\n            \n\n            \n\n        "
                    }
                ],
        "_name": "CommonState",
        "_id": "5",
        "__text": "\n        Common state from product\n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "_name": "SwitchOff",
            "__text": "\n            @deprecated\n            Switch off the drone when a overheat appeared\n        "
                    },
          {
            "_name": "Ventilate",
            "__text": "\n            @deprecated\n            Ventilate the drone when a overheat appeared\n        "
                    }
                ],
        "_name": "OverHeat",
        "_id": "6",
        "__text": "\n        Over heat commands\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": [
          {
            "_name": "OverHeatChanged",
            "__text": "\n            Overheat temperature reached\n        "
                    },
          {
            "arg": {
              "_name": "regulationType",
              "_type": "u8",
              "__text": "\n                Type of overheat regulation : 0 for ventilation, 1 for switch off\n            "
            },
            "_name": "OverHeatRegulationChanged",
            "__text": "\n            Overheat regulation state changed\n            \n\n        "
                    }
                ],
        "_name": "OverHeatState",
        "_id": "7",
        "__text": "\n        Overheat state from product\n        \n        \n\n        \n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "piloting",
            "_type": "u8",
            "__text": "\n                0 when the application is not in the piloting HUD, 1 when it enters the HUD.\n            "
          },
          "_name": "isPilotingChanged",
          "__text": "\n            Tell the device when the controller application enters/leaves the piloting HUD.\n            \n\n        "
        },
        "_name": "ControllerState",
        "_id": "8",
        "__text": "\n        Notify the device about the state of the controller application.\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "outdoor",
            "_type": "u8",
            "__text": "\n                1 if it should use outdoor wifi settings, 0 otherwise\n            "
          },
          "_name": "OutdoorSetting",
          "__text": "\n            Send to product if it should use its outdoor wifi config, or indoor\n            \n\n        "
        },
        "_name": "WifiSettings",
        "_id": "9",
        "__text": "\n        Wifi settings commands\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "outdoor",
            "_type": "u8",
            "__text": "\n                1 if it should use outdoor wifi settings, 0 otherwise\n            "
          },
          "_name": "outdoorSettingsChanged",
          "_type": "u8",
          "__text": "\n            Status of the wifi config : either indoor or outdoor\n            \n\n        "
        },
        "_name": "WifiSettingsState",
        "_id": "10",
        "__text": "\n        Wifi settings state from product\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "filepath",
                "_type": "string",
                "__text": "\n                 flight plan file path from the mavlink ftp root\n             "
                            },
              {
                "enum": [
                  {
                    "_name": "flightPlan",
                    "__text": "\n                    Mavlink file for FlightPlan\n                "
                                    },
                  {
                    "_name": "mapMyHouse",
                    "__text": "\n                    Mavlink file for MapMyHouse\n                "
                                    }
                                ],
                "_name": "type",
                "_type": "enum",
                "__text": "\n                type of the played mavlink file\n                \n\n                \n\n             "
                            }
                        ],
            "_name": "Start",
            "__text": "\n             Start the flight plan\n             \n\n             \n\n         "
                    },
          {
            "_name": "Pause",
            "__text": "\n             Pause the flightplan (can be restarted with a start)\n         "
                    },
          {
            "_name": "Stop",
            "__text": "\n             Stop the flightplan\n         "
                    }
                ],
        "_name": "Mavlink",
        "_id": "11",
        "__text": "\n         Mavlink flight plans commands\n         \n\n         \n\n         \n\n     "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "playing",
                    "__text": "\n                    Mavlink file is playing\n                "
                                    },
                  {
                    "_name": "stopped",
                    "__text": "\n                    Mavlink file is stopped (arg filepath and type are useless in this state)\n                "
                                    },
                  {
                    "_name": "paused",
                    "__text": "\n                    Mavlink file is paused\n                "
                                    }
                                ],
                "_name": "state",
                "_type": "enum",
                "__text": "\n                State of the mavlink \n                \n\n                \n\n                \n\n             "
                            },
              {
                "_name": "filepath",
                "_type": "string",
                "__text": "\n                 flight plan file path from the mavlink ftp root\n             "
                            },
              {
                "enum": [
                  {
                    "_name": "flightPlan",
                    "__text": "\n                    Mavlink file for FlightPlan\n                "
                                    },
                  {
                    "_name": "mapMyHouse",
                    "__text": "\n                    Mavlink file for MapMyHouse\n                "
                                    }
                                ],
                "_name": "type",
                "_type": "enum",
                "__text": "\n                type of the played mavlink file\n                \n\n                \n\n             "
                            }
                        ],
            "_name": "MavlinkFilePlayingStateChanged",
            "__text": "\n             Playing state of a mavlink flight plan\n             \n\n             \n\n             \n\n         "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "none",
                  "__text": "\n                     There is no error\n                 "
                                },
                {
                  "_name": "notInOutDoorMode",
                  "__text": "\n                     The drone is not in outdoor mode\n                 "
                                },
                {
                  "_name": "gpsNotFixed",
                  "__text": "\n                     The gps is not fixed\n                 "
                                },
                {
                  "_name": "notCalibrated",
                  "__text": "\n                     The magnetometer of the drone is not calibrated\n                 "
                                }
                            ],
              "_name": "error",
              "_type": "enum",
              "__text": "\n                 State of play error\n                 \n\n                 \n\n                 \n\n                 \n\n             "
            },
            "_name": "MavlinkPlayErrorStateChanged",
            "__text": "\n             FlightPlan play state error\n             \n\n         "
                    }
                ],
        "_name": "MavlinkState",
        "_id": "12",
        "__text": "\n         Mavlink flight plans states commands\n         \n\n         \n\n     "
            },
      {
        "cmd": {
          "arg": {
            "_name": "calibrate",
            "_type": "u8",
            "__text": "\n                1 if the calibration should be started, 0 if it should be aborted\n            "
          },
          "_name": "MagnetoCalibration",
          "__text": "\n            Sent when a calibration of the magnetometer is asked or is aborted\n            \n\n        "
        },
        "_name": "Calibration",
        "_id": "13",
        "__text": "\n        Calibration commands\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": [
              {
                "_name": "xAxisCalibration",
                "_type": "u8",
                "__text": "\n                State of the x axis (roll) calibration : 1 if calibration is done, 0 otherwise\n            "
                            },
              {
                "_name": "yAxisCalibration",
                "_type": "u8",
                "__text": "\n                State of the y axis (pitch) calibration : 1 if calibration is done, 0 otherwise\n            "
                            },
              {
                "_name": "zAxisCalibration",
                "_type": "u8",
                "__text": "\n                State of the z axis (yaw) calibration : 1 if calibration is done, 0 otherwise\n            "
                            },
              {
                "_name": "calibrationFailed",
                "_type": "u8",
                "__text": "\n                1 if calibration has failed, 0 otherwise. If this arg is 1, consider all previous arg as 0\n            "
                            }
                        ],
            "_name": "MagnetoCalibrationStateChanged",
            "__text": "\n            Sent when the state of the magneto calibration has changed\n            \n\n            \n\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "required",
              "_type": "u8",
              "__text": "\n                1 if calibration is required, 0 if current calibration is still valid\n            "
            },
            "_name": "MagnetoCalibrationRequiredState",
            "__text": "\n            Status of the calibration requirement\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "xAxis",
                  "__text": "\n                    If the current calibration axis should be the x axis\n                "
                                },
                {
                  "_name": "yAxis",
                  "__text": "\n                    If the current calibration axis should be the y axis\n                "
                                },
                {
                  "_name": "zAxis",
                  "__text": "\n                    If the current calibration axis should be the z axis\n                "
                                },
                {
                  "_name": "none",
                  "__text": "\n                    If none of the axis should be calibrated\n                "
                                }
                            ],
              "_name": "axis",
              "_type": "enum",
              "__text": "\n                The axis to calibrate\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "MagnetoCalibrationAxisToCalibrateChanged",
            "__text": "\n            Event sent by a product to inform about the axis to calibrate\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "started",
              "_type": "u8",
              "__text": "\n                1 if calibration has started, 0 otherwise\n            "
            },
            "_name": "MagnetoCalibrationStartedChanged",
            "__text": "\n            Status of the calibration process\n            \n\n        "
                    }
                ],
        "_name": "CalibrationState",
        "_id": "14",
        "__text": "\n        Status of the calibration\n        \n\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "fov",
              "_type": "float",
              "__text": "\n                Value of the camera horizontal fov (in degree)\n             "
                        },
            {
              "_name": "panMax",
              "_type": "float",
              "__text": "\n                Value of max pan (right pan) (in degree)\n             "
                        },
            {
              "_name": "panMin",
              "_type": "float",
              "__text": "\n                Value of min pan (left pan) (in degree)\n             "
                        },
            {
              "_name": "tiltMax",
              "_type": "float",
              "__text": "\n                Value of max tilt (top tilt) (in degree)\n             "
                        },
            {
              "_name": "tiltMin",
              "_type": "float",
              "__text": "\n                Value of min tilt (bottom tilt) (in degree)\n             "
                        }
                    ],
          "_name": "CameraSettingsChanged",
          "__text": "\n             Status of the camera settings\n             \n\n             \n\n             \n\n             \n\n             \n\n         "
        },
        "_name": "CameraSettingsState",
        "_id": "15",
        "__text": "\n         Status of the camera settings\n         \n\n     "
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "latitude",
              "_type": "double",
              "__text": "\n                Controller latitude in decimal degrees\n            "
                        },
            {
              "_name": "longitude",
              "_type": "double",
              "__text": "\n                Controller longitude in decimal degrees\n            "
                        }
                    ],
          "_name": "ControllerPositionForRun",
          "__text": "\n            Set the controller position for a run. This command is used by all non gps products. Watch out, this command cannot be used with BLE products\n            \n\n            \n\n        "
        },
        "_name": "GPS",
        "_id": "16",
        "__text": "\n        GPS related commands\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "AvailabilityState",
              "_type": "u8",
              "__text": "\n                Running a flightPlan file is available (1 running a flightPlan file is available, otherwise 0)\n            "
            },
            "_name": "AvailabilityStateChanged",
            "__text": "\n            State of availability to run a flight plan file\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "GPS",
                    "__text": "\n                    GPS for Drone FlightPlan\n                "
                                    },
                  {
                    "_name": "Calibration",
                    "__text": "\n                    Calibration for Drone FlightPlan\n                "
                                    },
                  {
                    "_name": "Mavlink_File",
                    "__text": "\n                    Mavlink file for Drone FlightPlan\n                "
                                    },
                  {
                    "_name": "TakeOff",
                    "__text": "\n                    Take off\n                "
                                    }
                                ],
                "_name": "component",
                "_type": "enum",
                "__text": "\n                Drone FlightPlan component id (unique)\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "_name": "State",
                "_type": "u8",
                "__text": "\n                State of the FlightPlan component (1 FlightPlan component OK, otherwise 0)\n            "
                            }
                        ],
            "_name": "ComponentStateListChanged",
            "_listtype": "MAP",
            "__text": "\n            List of state of drone flightPlan components\n            \n\n            \n\n        "
                    }
                ],
        "_name": "FlightPlanState",
        "_id": "17",
        "__text": "\n        FlightPlan state commands\n        \n\n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "_name": "StartingErrorEvent",
            "__text": "\n            Event of flight plan start error\n        "
                    },
          {
            "_name": "SpeedBridleEvent",
            "__text": "\n            Bridle speed of the drone\n        "
                    }
                ],
        "_name": "FlightPlanEvent",
        "_id": "19",
        "__text": "\n        FlightPlan Event commands\n        \n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "\n                version of libARCommands (\"1.2.3.4\" format)\n            "
            },
            "_name": "ControllerLibARCommandsVersion",
            "__text": "\n            Controller libARCommands version\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "\n                version of libARCommands (\"1.2.3.4\" format)\n            "
            },
            "_name": "SkyControllerLibARCommandsVersion",
            "__text": "\n            SkyController libARCommands version\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "version",
              "_type": "string",
              "__text": "\n                version of libARCommands (\"1.2.3.4\" format)\n            "
            },
            "_name": "DeviceLibARCommandsVersion",
            "__text": "\n            Device libARCommands version\n            \n\n        "
                    }
                ],
        "_name": "ARLibsVersionsState",
        "_id": "18",
        "__text": "\n        ARlibs Versions Commands\n        \n\n        \n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "ready",
            "_type": "u8",
            "__text": "\n                Bit field for TX and RX ready.\n                bit 0 is 1 if controller is ready and wants to receive sound (Drone TX)\n                bit 1 is 1 if controller is ready and wants to send sound (Drone RX)\n            "
          },
          "_name": "ControllerReadyForStreaming",
          "__text": "\n            Tell the firmware whether the controller is ready to start audio streaming.\n            \n\n        "
        },
        "_name": "Audio",
        "_id": "20",
        "__text": "\n        Audio-related commands.\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "_name": "running",
            "_type": "u8",
            "__text": "\n                Bit field for TX and RX running\n                bit 0 is 1 if Drone TX is running\n                bit 1 is 1 if Drone RX is running\n            "
          },
          "_name": "AudioStreamingRunning",
          "__text": "\n            Notify the controller whether the audio streaming is running.\n            \n\n        "
        },
        "_name": "AudioState",
        "_id": "21",
        "__text": "\n        Audio-related state updates.\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "left",
              "_type": "u8",
              "__text": "\n                Set the left LED intensity value (0 through 255).\n            "
                        },
            {
              "_name": "right",
              "_type": "u8",
              "__text": "\n                Set the right LED intensity value (0 through 255).\n            "
                        }
                    ],
          "_name": "intensity",
          "__text": "\n            Set instensity of lighting LEDs.\n            \n\n            \n\n        "
        },
        "_name": "Headlights",
        "_id": "22",
        "__text": "\n        Controls the headlight LEDs of the Evo variants.\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "_name": "left",
              "_type": "u8",
              "__text": "\n                The intensity value for the left LED (0 through 255).\n            "
                        },
            {
              "_name": "right",
              "_type": "u8",
              "__text": "\n                The intensity value for the right LED (0 through 255).\n            "
                        }
                    ],
          "_name": "intensityChanged",
          "__text": "\n            Notify the instensity values for headlight LEDs.\n            \n\n            \n\n        "
        },
        "_name": "HeadlightsState",
        "_id": "23",
        "__text": "\n        Get information about the state of the Evo variants' LEDs.\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "HEADLIGHTS_FLASH",
                  "__text": "\n                    Flash headlights.\n                "
                                },
                {
                  "_name": "HEADLIGHTS_BLINK",
                  "__text": "\n                    Blink headlights.\n                "
                                },
                {
                  "_name": "HEADLIGHTS_OSCILLATION",
                  "__text": "\n                    Oscillating headlights.\n                "
                                },
                {
                  "_name": "SPIN",
                  "__text": "\n                    Spin animation.\n                "
                                },
                {
                  "_name": "TAP",
                  "__text": "\n                    Tap animation.\n                "
                                },
                {
                  "_name": "SLOW_SHAKE",
                  "__text": "\n                    Slow shake animation.\n                "
                                },
                {
                  "_name": "METRONOME",
                  "__text": "\n                    Metronome animation.\n                "
                                },
                {
                  "_name": "ONDULATION",
                  "__text": "\n                    Standing dance animation.\n                "
                                },
                {
                  "_name": "SPIN_JUMP",
                  "__text": "\n                    Spin jump animation.\n                "
                                },
                {
                  "_name": "SPIN_TO_POSTURE",
                  "__text": "\n                    Spin that end in standing posture, or in jumper if it was standing animation.\n                "
                                },
                {
                  "_name": "SPIRAL",
                  "__text": "\n                    Spiral animation.\n                "
                                },
                {
                  "_name": "SLALOM",
                  "__text": "\n                    Slalom animation.\n                "
                                },
                {
                  "_name": "BOOST",
                  "__text": "\n                    Boost animation.\n                "
                                }
                            ],
              "_name": "anim",
              "_type": "enum",
              "__text": "\n                Animation to start.\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "StartAnimation",
            "__text": "\n            Start a paramaterless animation.\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "HEADLIGHTS_FLASH",
                  "__text": "\n                    Flash headlights.\n                "
                                },
                {
                  "_name": "HEADLIGHTS_BLINK",
                  "__text": "\n                    Blink headlights.\n                "
                                },
                {
                  "_name": "HEADLIGHTS_OSCILLATION",
                  "__text": "\n                    Oscillating headlights.\n                "
                                },
                {
                  "_name": "SPIN",
                  "__text": "\n                    Spin animation.\n                "
                                },
                {
                  "_name": "TAP",
                  "__text": "\n                    Tap animation.\n                "
                                },
                {
                  "_name": "SLOW_SHAKE",
                  "__text": "\n                    Slow shake animation.\n                "
                                },
                {
                  "_name": "METRONOME",
                  "__text": "\n                    Metronome animation.\n                "
                                },
                {
                  "_name": "ONDULATION",
                  "__text": "\n                    Standing dance animation.\n                "
                                },
                {
                  "_name": "SPIN_JUMP",
                  "__text": "\n                    Spin jump animation.\n                "
                                },
                {
                  "_name": "SPIN_TO_POSTURE",
                  "__text": "\n                    Spin that end in standing posture, or in jumper if it was standing animation.\n                "
                                },
                {
                  "_name": "SPIRAL",
                  "__text": "\n                    Spiral animation.\n                "
                                },
                {
                  "_name": "SLALOM",
                  "__text": "\n                    Slalom animation.\n                "
                                },
                {
                  "_name": "BOOST",
                  "__text": "\n                    Boost animation.\n                "
                                }
                            ],
              "_name": "anim",
              "_type": "enum",
              "__text": "\n                Animation to stop.\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "StopAnimation",
            "__text": "\n            Stop a running animation.\n            \n\n        "
                    },
          {
            "_name": "StopAllAnimations",
            "__text": "\n            Stop all running animations.\n        "
                    }
                ],
        "_name": "Animations",
        "_id": "24",
        "__text": "\n        Animations-related commands.\n\n        \n\n\n        \n\n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": [
            {
              "enum": [
                {
                  "_name": "HEADLIGHTS_FLASH",
                  "__text": "\n                    Flash headlights.\n                "
                                },
                {
                  "_name": "HEADLIGHTS_BLINK",
                  "__text": "\n                    Blink headlights.\n                "
                                },
                {
                  "_name": "HEADLIGHTS_OSCILLATION",
                  "__text": "\n                    Oscillating headlights.\n                "
                                },
                {
                  "_name": "SPIN",
                  "__text": "\n                    Spin animation.\n                "
                                },
                {
                  "_name": "TAP",
                  "__text": "\n                    Tap animation.\n                "
                                },
                {
                  "_name": "SLOW_SHAKE",
                  "__text": "\n                    Slow shake animation.\n                "
                                },
                {
                  "_name": "METRONOME",
                  "__text": "\n                    Metronome animation.\n                "
                                },
                {
                  "_name": "ONDULATION",
                  "__text": "\n                    Standing dance animation.\n                "
                                },
                {
                  "_name": "SPIN_JUMP",
                  "__text": "\n                    Spin jump animation.\n                "
                                },
                {
                  "_name": "SPIN_TO_POSTURE",
                  "__text": "\n                    Spin that end in standing posture, or in jumper if it was standing animation.\n                "
                                },
                {
                  "_name": "SPIRAL",
                  "__text": "\n                    Spiral animation.\n                "
                                },
                {
                  "_name": "SLALOM",
                  "__text": "\n                    Slalom animation.\n                "
                                },
                {
                  "_name": "BOOST",
                  "__text": "\n                    Boost animation.\n                "
                                }
                            ],
              "_name": "anim",
              "_type": "enum",
              "__text": "\n                Animation type.\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                        },
            {
              "enum": [
                {
                  "_name": "stopped",
                  "__text": "\n                    animation is stopped\n                "
                                },
                {
                  "_name": "started",
                  "__text": "\n                    animation is started\n                "
                                },
                {
                  "_name": "notAvailable",
                  "__text": "\n                    The animation is not available\n                "
                                }
                            ],
              "_name": "state",
              "_type": "enum",
              "__text": "\n                State of the animation\n                \n\n                \n\n                \n\n            "
                        },
            {
              "enum": [
                {
                  "_name": "ok",
                  "__text": "\n                    No Error\n                "
                                },
                {
                  "_name": "unknown",
                  "__text": "\n                    Unknown generic error\n                "
                                }
                            ],
              "_name": "error",
              "_type": "enum",
              "__text": "\n                Error to explain the state \n                \n\n                \n\n            "
                        }
                    ],
          "_name": "List",
          "_listtype": "MAP",
          "__text": "\n            List of animations state.\n            \n\n            \n            \n\n            \n            \n\n        "
        },
        "_name": "AnimationsState",
        "_id": "25",
        "__text": "\n        Animations-related notification/feedback commands.\n\n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "NO_ACCESSORY",
                "__text": "\n                    No accessory.\n                "
                            },
              {
                "_name": "STD_WHEELS",
                "__text": "\n                    Standard wheels\n                "
                            },
              {
                "_name": "TRUCK_WHEELS",
                "__text": "\n                    Truck wheels\n                "
                            },
              {
                "_name": "HULL",
                "__text": "\n                    Hull\n                "
                            },
              {
                "_name": "HYDROFOIL",
                "__text": "\n                    Hydrofoil\n                "
                            }
                        ],
            "_name": "accessory",
            "_type": "enum",
            "__text": "\n                Accessory configuration to set.\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
          },
          "_name": "Config",
          "__text": "\n            Set the current accessory configuration.\n            \n\n        "
        },
        "_name": "Accessory",
        "_id": "26",
        "__text": "\n        Accessories-related commands.\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "NO_ACCESSORY",
                  "__text": "\n                    No accessory.\n                "
                                },
                {
                  "_name": "STD_WHEELS",
                  "__text": "\n                    Standard wheels\n                "
                                },
                {
                  "_name": "TRUCK_WHEELS",
                  "__text": "\n                    Truck wheels\n                "
                                },
                {
                  "_name": "HULL",
                  "__text": "\n                    Hull\n                "
                                },
                {
                  "_name": "HYDROFOIL",
                  "__text": "\n                    Hydrofoil\n                "
                                }
                            ],
              "_name": "accessory",
              "_type": "enum",
              "__text": "\n                Accessory configurations supported by the product.\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "SupportedAccessoriesListChanged",
            "_listtype": "MAP",
            "__text": "\n            List of supported accessories\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "UNCONFIGURED",
                    "__text": "\n                    No accessory configuration set. Controller needs to set one.\n                "
                                    },
                  {
                    "_name": "NO_ACCESSORY",
                    "__text": "\n                    No accessory.\n                "
                                    },
                  {
                    "_name": "STD_WHEELS",
                    "__text": "\n                    Standard wheels\n                "
                                    },
                  {
                    "_name": "TRUCK_WHEELS",
                    "__text": "\n                    Truck wheels\n                "
                                    },
                  {
                    "_name": "HULL",
                    "__text": "\n                    Hull\n                "
                                    },
                  {
                    "_name": "HYDROFOIL",
                    "__text": "\n                    Hydrofoil\n                "
                                    }
                                ],
                "_name": "newAccessory",
                "_type": "enum",
                "__text": "\n                Accessory configuration reported by firmware.\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "OK",
                    "__text": "\n                    No error. Accessory config change successful.\n                "
                                    },
                  {
                    "_name": "UNKNOWN",
                    "__text": "\n                    Cannot change accessory configuration for some reason.\n                "
                                    },
                  {
                    "_name": "FLYING",
                    "__text": "\n                    Cannot change accessory configuration while flying.\n                "
                                    }
                                ],
                "_name": "error",
                "_type": "enum",
                "__text": "\n                Error code.\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "AccessoryConfigChanged",
            "__text": "\n            Accessory config response.\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "_name": "enabled",
              "_type": "u8",
              "__text": "\n                1 if the modification of the accessory Config is enabled, 0 otherwise\n            "
            },
            "_name": "AccessoryConfigModificationEnabled",
            "__text": "\n            Possibility to modify the accessory configuration.\n            \n\n        "
                    }
                ],
        "_name": "AccessoryState",
        "_id": "27",
        "__text": "\n        Accessories-related commands.\n        \n\n\n        \n\n        \n        \n\n    "
            },
      {
        "cmd": {
          "arg": {
            "enum": [
              {
                "_name": "SLOW",
                "__text": "\n                    Fully charge the battery at a slow rate. Typically limit max charge current to 512 mA.\n                "
                            },
              {
                "_name": "MODERATE",
                "__text": "\n                    Almost fully-charge the battery at moderate rate (> 512mA) but slower than the fastest rate.\n                "
                            },
              {
                "_name": "FAST",
                "__text": "\n                    Almost fully-charge the battery at the highest possible rate supported by the charger.\n                "
                            }
                        ],
            "_name": "rate",
            "_type": "enum",
            "__text": "\n                The new maximum charge rate.\n                \n\n                \n\n                \n\n            "
          },
          "_name": "SetMaxChargeRate",
          "__text": "\n            @deprecated\n            Set the maximum charge rate allowed to charge a battery.\n            \n\n        "
        },
        "_name": "Charger",
        "_id": "28",
        "__text": "\n        Commands sent by the controller to set charger parameters.\n\n        \n\n    "
            },
      {
        "cmd": [
          {
            "arg": {
              "enum": [
                {
                  "_name": "SLOW",
                  "__text": "\n                    Fully charge the battery at a slow rate. Typically limit max charge current to 512 mA.\n                "
                                },
                {
                  "_name": "MODERATE",
                  "__text": "\n                    Almost fully-charge the battery at moderate rate (> 512 mA) but slower than the fastest rate.\n                "
                                },
                {
                  "_name": "FAST",
                  "__text": "\n                    Almost fully-charge the battery at the highest possible rate supported by the charger.\n                "
                                }
                            ],
              "_name": "rate",
              "_type": "enum",
              "__text": "\n                The current maximum charge rate.\n                \n\n                \n\n                \n\n            "
            },
            "_name": "MaxChargeRateChanged",
            "__text": "\n            @deprecated\n            The maximum charge rate reported by the firmware.\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "DISCHARGING",
                    "__text": "\n                    The battery is discharging.\n                "
                                    },
                  {
                    "_name": "CHARGING_SLOW",
                    "__text": "\n                    The battery is charging at a slow rate about 512 mA.\n                "
                                    },
                  {
                    "_name": "CHARGING_MODERATE",
                    "__text": "\n                    The battery is charging at a moderate rate (> 512 mA) but slower than the fastest rate.\n                "
                                    },
                  {
                    "_name": "CHARGING_FAST",
                    "__text": "\n                    The battery is charging at a the fastest rate.\n                "
                                    },
                  {
                    "_name": "BATTERY_FULL",
                    "__text": "\n                    The charger is plugged and the battery is fully charged.\n                "
                                    }
                                ],
                "_name": "status",
                "_type": "enum",
                "__text": "\n                Charger status.\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "UNKNOWN",
                    "__text": "\n                    The charge phase is unknown or irrelevant.\n                "
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_1",
                    "__text": "\n                    First phase of the charging process. The battery is charging with constant current.\n                "
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_2",
                    "__text": "\n                    Second phase of the charging process. The battery is charging with constant current, with a higher voltage than the first phase.\n                "
                                    },
                  {
                    "_name": "CONSTANT_VOLTAGE",
                    "__text": "\n                    Last part of the charging process. The battery is charging with a constant voltage.\n                "
                                    },
                  {
                    "_name": "CHARGED",
                    "__text": "\n                    The battery is fully charged.\n                "
                                    }
                                ],
                "_name": "phase",
                "_type": "enum",
                "__text": "\n                The current charging phase.\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            }
                        ],
            "_name": "CurrentChargeStateChanged",
            "__text": "\n            @deprecated\n            The charge status of the battery changed.\n            \n\n            \n\n        "
                    },
          {
            "arg": {
              "enum": [
                {
                  "_name": "UNKNOWN",
                  "__text": "\n                    The last charge rate is not known.\n                "
                                },
                {
                  "_name": "SLOW",
                  "__text": "\n                    Slow charge rate.\n                "
                                },
                {
                  "_name": "MODERATE",
                  "__text": "\n                    Moderate charge rate.\n                "
                                },
                {
                  "_name": "FAST",
                  "__text": "\n                    Fast charge rate.\n                "
                                }
                            ],
              "_name": "rate",
              "_type": "enum",
              "__text": "\n                The charge rate recorded by the firmware for the last charge.\n                \n\n                \n\n                \n\n                \n\n            "
            },
            "_name": "LastChargeRateChanged",
            "__text": "\n            @deprecated\n            The charge rate of the last charge sent by the firmware.\n            \n\n        "
                    },
          {
            "arg": [
              {
                "enum": [
                  {
                    "_name": "UNKNOWN",
                    "__text": "\n                    The charge phase is unknown or irrelevant.\n                "
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_1",
                    "__text": "\n                    First phase of the charging process. The battery is charging with constant current.\n                "
                                    },
                  {
                    "_name": "CONSTANT_CURRENT_2",
                    "__text": "\n                    Second phase of the charging process. The battery is charging with constant current, with a higher voltage than the first phase.\n                "
                                    },
                  {
                    "_name": "CONSTANT_VOLTAGE",
                    "__text": "\n                    Last part of the charging process. The battery is charging with a constant voltage.\n                "
                                    },
                  {
                    "_name": "CHARGED",
                    "__text": "\n                    The battery is fully charged.\n                "
                                    },
                  {
                    "_name": "DISCHARGING",
                    "__text": "\n                    The battery is discharging; Other arguments refers to the last charge.\n                "
                                    }
                                ],
                "_name": "phase",
                "_type": "enum",
                "__text": "\n                The current charging phase.\n                \n\n                \n\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "enum": [
                  {
                    "_name": "UNKNOWN",
                    "__text": "\n                    The charge rate is not known.\n                "
                                    },
                  {
                    "_name": "SLOW",
                    "__text": "\n                    Slow charge rate.\n                "
                                    },
                  {
                    "_name": "MODERATE",
                    "__text": "\n                    Moderate charge rate.\n                "
                                    },
                  {
                    "_name": "FAST",
                    "__text": "\n                    Fast charge rate.\n                "
                                    }
                                ],
                "_name": "rate",
                "_type": "enum",
                "__text": "\n                The charge rate. If phase is DISCHARGING, refers to the last charge.\n                \n\n                \n\n                \n\n                \n\n            "
                            },
              {
                "_name": "intensity",
                "_type": "u8",
                "__text": "\n                The charging intensity, in dA. (12dA = 1,2A) ; If phase is DISCHARGING, refers to the last charge. Equals to 0 if not known.\n            "
                            },
              {
                "_name": "fullChargingTime",
                "_type": "u8",
                "__text": "\n                The full charging time estimated, in minute. If phase is DISCHARGING, refers to the last charge. Equals to 0 if not known.\n            "
                            }
                        ],
            "_name": "ChargingInfo",
            "__text": "\n            Information of the charge.\n            \n\n            \n\n            \n\n            \n\n        "
                    }
                ],
        "_name": "ChargerState",
        "_id": "29",
        "__text": "\n        Commands sent by the firmware to advertise the charger status.\n\n        \n\n        \n\n        \n\n        \n\n    "
            }
        ],
    "_id": "0",
    "__text": "\n    All common commands shared between all projects\n\n    \n\n    \n    \n\n    \n    \n\n    \n    \n\n    \n    \n\n\n    \n\n    \n    \n\n    \n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n     \n\n    \n\n    \n\n    \n\n\n     \n\n    \n    \n\n    \n    \n\n    \n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n    \n\n\n"
    }
  ]