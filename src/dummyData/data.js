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
  stateSnapshot: {
    'User:7': {
      id: '7',
      __typename: 'User',
      email: 'test@test.test',
      trips: [{ __ref: 'Launch:99' }, { __ref: 'Launch:98' }],
    },
    ROOT_QUERY: {
      __typename: 'Query',
      me: { __ref: 'User:7' },
      launches: {
        __typename: 'LaunchConnection',
        cursor: '1560349020',
        hasMore: true,
        launches: [
          { __ref: 'Launch:99' },
          { __ref: 'Launch:98' },
          { __ref: 'Launch:97' },
          { __ref: 'Launch:96' },
          { __ref: 'Launch:95' },
          { __ref: 'Launch:94' },
          { __ref: 'Launch:93' },
          { __ref: 'Launch:92' },
          { __ref: 'Launch:91' },
          { __ref: 'Launch:90' },
          { __ref: 'Launch:89' },
          { __ref: 'Launch:88' },
          { __ref: 'Launch:87' },
          { __ref: 'Launch:86' },
          { __ref: 'Launch:85' },
          { __ref: 'Launch:84' },
          { __ref: 'Launch:83' },
          { __ref: 'Launch:82' },
          { __ref: 'Launch:81' },
          { __ref: 'Launch:80' },
        ],
      },
      'launch({"id":"99"})': { __ref: 'Launch:99' },
      'launch({"id":"98"})': { __ref: 'Launch:98' },
    },
    'Rocket:falcon9': { id: 'falcon9', __typename: 'Rocket', name: 'Falcon 9', type: 'FT' },
    'Launch:99': {
      id: '99',
      __typename: 'Launch',
      isBooked: true,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink-9 (v1.0) & BlackSky Global 5-6',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
      site: 'KSC LC 39A',
    },
    'Launch:98': {
      id: '98',
      __typename: 'Launch',
      isBooked: true,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: { __typename: 'Mission', name: 'ANASIS-II', missionPatch: null },
      site: 'CCAFS SLC 40',
    },
    'Launch:97': {
      id: '97',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: { __typename: 'Mission', name: 'GPS III SV03 (Columbus)', missionPatch: null },
    },
    'Launch:96': {
      id: '96',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink-8 & SkySat 16-18',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:95': {
      id: '95',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 7',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:94': {
      id: '94',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'CCtCap Demo Mission 2',
        missionPatch: 'https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png',
      },
    },
    'Launch:93': {
      id: '93',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 6',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:92': {
      id: '92',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 5',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:91': {
      id: '91',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'CRS-20',
        missionPatch: 'https://images2.imgbox.com/15/2b/NAcsTEB6_o.png',
      },
    },
    'Launch:90': {
      id: '90',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 4',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:89': {
      id: '89',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 3',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:88': {
      id: '88',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Crew Dragon In Flight Abort Test',
        missionPatch: 'https://images2.imgbox.com/9d/04/DNXjbXDY_o.png',
      },
    },
    'Launch:87': {
      id: '87',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 2',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:86': {
      id: '86',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'JCSat 18 / Kacific 1',
        missionPatch: 'https://images2.imgbox.com/49/eb/evB1Wi95_o.png',
      },
    },
    'Launch:85': {
      id: '85',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'CRS-19',
        missionPatch: 'https://images2.imgbox.com/1f/40/3mc9OSdH_o.png',
      },
    },
    'Launch:84': {
      id: '84',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Starlink 1',
        missionPatch: 'https://images2.imgbox.com/d2/3b/bQaWiil0_o.png',
      },
    },
    'Launch:83': {
      id: '83',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'Amos-17',
        missionPatch: 'https://images2.imgbox.com/a0/ab/XUoByiuR_o.png',
      },
    },
    'Launch:82': {
      id: '82',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'CRS-18',
        missionPatch: 'https://images2.imgbox.com/08/a2/bPpNeIRJ_o.png',
      },
    },
    'Rocket:falconheavy': { id: 'falconheavy', __typename: 'Rocket', name: 'Falcon Heavy' },
    'Launch:81': {
      id: '81',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falconheavy' },
      mission: {
        __typename: 'Mission',
        name: 'STP-2',
        missionPatch: 'https://images2.imgbox.com/18/17/gCjLjHbl_o.png',
      },
    },
    'Launch:80': {
      id: '80',
      __typename: 'Launch',
      isBooked: false,
      rocket: { __ref: 'Rocket:falcon9' },
      mission: {
        __typename: 'Mission',
        name: 'RADARSAT Constellation',
        missionPatch: 'https://images2.imgbox.com/c3/06/2irK3PGj_o.png',
      },
    },
    ROOT_MUTATION: {
      __typename: 'Mutation',
      'bookTrips({"launchIds":["99","98"]})': {
        __typename: 'TripUpdateResponse',
        success: true,
        message: 'trips booked successfully',
        launches: [{ __ref: 'Launch:99' }, { __ref: 'Launch:98' }],
      },
    },
  },
  diff: `TBD`,
};
