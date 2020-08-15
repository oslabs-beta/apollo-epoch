export const dummyList = [
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `,
    responseString: `
      {
        "data": {},
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query GetLaunchList($after: String) {
        launches(after: $after) {
          cursor
          hasMore
          launches {
            ...LaunchTile
            __typename
          }
          __typename
        }
      }
      
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launches": {
            "cursor": "1560349020",
            "hasMore": true,
            "launches": [
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": null,
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "83",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Amos-17",
                  "missionPatch": "https://images2.imgbox.com/a0/ab/XUoByiuR_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "82",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-18",
                  "missionPatch": "https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "81",
                "isBooked": false,
                "rocket": {
                  "id": "falconheavy",
                  "name": "Falcon Heavy",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "STP-2",
                  "missionPatch": "https://images2.imgbox.com/18/17/gCjLjHbl_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "80",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "RADARSAT Constellation",
                  "missionPatch": "https://images2.imgbox.com/c3/06/2irK3PGj_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
  {
    queryString: `
      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
            __typename
          }
          ...LaunchTile
          __typename
        }
      }
      fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
          __typename
        }
        mission {
          name
          missionPatch
          __typename
        }
      }
    `,
    responseString: `
      {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "99",
            "isBooked": false,
            "mission": {
              "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
              "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
              "__typename": "Mission"
            }
          }
        },
        "loading": false,
        "networkStatus": 7,
        "stale": false
      }
    `,
    stateSnapshot: `TBD`,
    diff: `TBD`,
  },
];

export const dummyQuery = {
  queryString: `
    query LaunchDetails($launchId: ID!) {
      launch(id: $launchId) {
        site
        rocket {
          type
          __typename
        }
        ...LaunchTile
        __typename
      }
    }
    fragment LaunchTile on Launch {
      __typename
      id
      isBooked
      rocket {
        id
        name
        __typename
      }
      mission {
        name
        missionPatch
        __typename
      }
    }
  `,
  response: {
    data: {
      launch: {
        site: 'KSC LC 39A',
        rocket: {
          type: 'FT',
          __typename: 'Rocket',
          id: 'falcon9',
          name: 'Falcon 9',
        },
        __typename: 'Launch',
        id: '99',
        isBooked: false,
        mission: {
          name: 'Starlink-9 (v1.0) & BlackSky Global 5-6',
          missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
          __typename: 'Mission',
        },
      },
    },
    loading: false,
    networkStatus: 7,
    stale: false,
  },
  stateSnapshot: `TBD`,
  diff: `TBD`,
};
