var jsonServer = require('json-server')

// Returns an Express server
var server = jsonServer.create()

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults())

var router = jsonServer.router('db.json')

server.use(jsonServer.rewriter({
  '/container/api/v1/cloudbox/auth': '/auth',
  // '/user/111': '/user',
  '/container/api/v1/cloudbox/message': '/messageByUserId',
  '/container/api/v1/cloudbox/containerhistory': '/containerhistory',
  '/container/api/v1/cloudbox/containerInstantInfo': '/containerInstantInfo',
  '/container/api/v1/cloudbox/containerReportHistory': '/containerReportHistory',
  '/container/api/v1/cloudbox/alerts': '/alerts',
  '/container/api/v1/cloudbox/basicInfo': '/basicInfo',
  '/container/api/v1/cloudbox/boxStatus': '/boxStatus',
  '/container/api/v1/cloudbox/realtimeInfo': '/realtimeInfo',
  "/container/api/v1/cloudbox/satellites": "/satelites",
  "/container/api/v1/cloudbox/containers": "/containers",
  "/container/api/v1/cloudbox/alertLevel":"/alertLevel",
  "/container/api/v1/cloudbox/basicInfoManage":"/basicInfoManage",
  "/container/api/v1/cloudbox/basicInfoConfig":"/basicInfoConfig",
  "/container/api/v1/cloudbox/securityConfig":"/securityConfig",
  "/container/api/v1/cloudbox/alertConfig":"/alertConfig",
  "/container/api/v1/cloudbox/issueConfig":"/issueConfig",
  "/container/api/v1/cloudbox/issueConfig":"/issueConfig",
  "/container/api/v1/cloudbox/alertConfig":"/alertConfig",
  "/container/api/v1/cloudbox/options":"/options"
}))

server.post('/auth', function (req, res) {
  res.json({
    "userid": "111",
    // "sessionid": "111",
    token: 'eyJraWQiOiJJT1RfU0VDVVJFS0VZIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJJT1RfUExBVEZPUk1fSVNTVUVSIiwiYXVkIjoiSU9UX1BMQVRGT1JNX0FVRElFTkNFIiwiZXhwIjoxNzgwMDc0MTU1LCJqdGkiOiJjcTFDMC10RVBXUEk1XzN2Z1FsQ2RBIiwiaWF0IjoxNDY5MDM0MTU1LCJzdWIiOiJhZG1pbiIsImNsYWltLnJvbGVzIjpbIkFETUlOIl19.pzXQDv82gPrpNVas_2DHt8mihoNhqw8mnAMlDwnCC-Jkj5xodi_UBTVG8thOLaNSSLpflOqhJ8eJMstZTEJI9Nsoy1axBIun-U47NGpeZF76GUI9vh7wf_9EpwKVs0UDyK5amAVrzyiO6nQEjtMPPbGX_fWfUasB_JP5H34O2pqTl5cb6irSoJxB-_MB7lxZYJ4V9u0W9XRuFbaQtdG5YSiib7-WHHEhOIQ6X3Xg7y9josfUf41BfD9cOs2U_k3WZjiiosZVajy8DatMxF96BZuGVRh4VxozvczuiThyLAcsXW2TjYen4bgGJcH2AG7ip002NDrPxpaE2STcJwtxBQ' 
  });
})


server.post('/containerInstantInfo', function (req, res) {
  res.json({
    "containerInfo": {
      "containerId": "111",
      "carrier": "中集智能"
    },
    "startPosition": {
      "lng": 117,
      "lat": 36.65
    },
    "currentPosition": {
      "lng": 118.78,
      "lat": 32.04
    },
    "endPosition": {
      "lng": 121.557348,
      "lat": 31.179784
    }
  });
})


server.post('/containerReportHistory', function (req, res) {
  res.json({
    "containerReportHistory": [
      {
        "containerId": "22932214122313",
        "containerType": "标准云箱",
        "reportType": "实时报文",
        "reportLength": 60,
        "originalReport": "23-3030202",
        "factoryDate": "1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType": "标准云箱",
        "reportType": "实时报文",
        "reportLength": 60,
        "originalReport": "23-3030202",
        "factoryDate": "1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType": "标准云箱",
        "reportType": "实时报文",
        "reportLength": 60,
        "originalReport": "23-3030202",
        "factoryDate": "1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType": "标准云箱",
        "reportType": "实时报文",
        "reportLength": 60,
        "originalReport": "23-3030202",
        "factoryDate": "1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType": "标准云箱",
        "reportType": "实时报文",
        "reportLength": 60,
        "originalReport": "23-3030202",
        "factoryDate": "1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType": "标准云箱",
        "reportType": "实时报文",
        "reportLength": 60,
        "originalReport": "23-3030202",
        "factoryDate": "1495597347299"
      }
    ]
  });
})

server.post('/alerts', function (req, res) {
  res.json({
    "alerts": [
      {
        "containerId": "22932214122313",
        "alertTime": "1495597347299",
        "alertType": "实时报文",
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "alertTime": "1495597347299",
        "alertType": "实时报文",
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "alertTime": "1495597347299",
        "alertType": "实时报文",
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "alertTime": "1495597347299",
        "alertType": "实时报文",
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "alertTime": "1495597347299",
        "alertType": "实时报文",
        "carrier": "中集集团"
      }
    ]
  });
})

server.post('/boxStatus', function (req, res) {
  res.json({
    "boxStatus": [
      {
        "containerId": "22932214122313",
        "currentStatus": "标准云箱",
        "position": {
          "lng": 121.557348,
          "lat": 31.179784
        },
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "currentStatus": "标准云箱",
        "position": {
          "lng": 121.557348,
          "lat": 31.179784
        },
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "currentStatus": "标准云箱",
        "position": {
          "lng": 121.557348,
          "lat": 31.179784
        },
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "currentStatus": "标准云箱",
        "position": {
          "lng": 121.557348,
          "lat": 31.179784
        },
        "carrier": "中集集团"
      },
      {
        "containerId": "22932214122313",
        "currentStatus": "标准云箱",
        "position": {
          "lng": 121.557348,
          "lat": 31.179784
        },
        "carrier": "中集集团"
      }
    ]
  });
})

server.post('/containerhistory', function (req, res) {
  res.json({
    "containerhistory": [
      {
        "containerId": "111",
        "start": {
          "time": "111",
          "position": {
            "lng": 121.557348,
            "lat": 31.179784
          }
        },
        "end": {
          "time": "222",
          "position": {
            "lng": 117,
            "lat": 36.65
          }
        }
      },
      {
        "containerId": "222",
        "start": {
          "time": "111",
          "position": {
            "lng": 104.06,
            "lat": 30.67
          }
        },
        "end": {
          "time": "222",
          "position": {
            "lng": 118.78,
            "lat": 32.04
          }
        }
      },
      {
        "containerId": "333",
        "start": {
          "time": "111",
          "position": {
            "lng": 113,
            "lat": 28.21
          }
        },
        "end": {
          "time": "222",
          "position": {
            "lng": 108.95,
            "lat": 34.27
          }
        }
      }
    ]
  });
})

server.post('/basicInfo', function (req, res) {
  res.json({
    "basicInfo":[
      {
        "containerId": "22932214122313",
        "containerType":"标准云箱",
        "factoryLocation":"中国-上海",
        "factory":"中集集团",
        "carrier":"中集集团",
        "factoryDate":"1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType":"标准云箱",
        "factoryLocation":"中国-上海",
        "factory":"中集集团",
        "carrier":"中集集团",
        "factoryDate":"1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType":"标准云箱",
        "factoryLocation":"中国-上海",
        "factory":"中集集团",
        "carrier":"中集集团",
        "factoryDate":"1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType":"标准云箱",
        "factoryLocation":"中国-上海",
        "factory":"中集集团",
        "carrier":"中集集团",
        "factoryDate":"1495597347299"
      },
      {
        "containerId": "22932214122313",
        "containerType":"标准云箱",
        "factoryLocation":"中国-上海",
        "factory":"中集集团",
        "carrier":"中集集团",
        "factoryDate":"1495597347299"
      }
    ]
  });
})

server.post('/realtimeInfo', function (req, res) {
  res.json({
    "containerId": "111",
    "containerType": "标准云箱",
    "currentStatus": "在运",
    "carrier": "中集智能",
    "position": {
      "lng": 118.78,
      "lat":32.04
    },
    "speed": 120,
    "temperature": { value: 39, status: "正常"},
    "humidity": { value: 70, status: "正常"},
    "battery": { value: 0.6, status: "正常" },
    "boxStatus": {
      "num_of_collide": { value: 39, status: "正常"},
      "num_of_door_open": { value: 39, status: "正常"}
    }
  });
})

server.post('/options', function (req, res) {
  res.json({
    "alertLevel": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "alertCode": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "alertType": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "containerType": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "reportType": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "currentStatus": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "location": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "carrier": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "factory": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "factoryLocation": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "batteryInfo": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "hardwareInfo": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "maintenanceLocation": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ],
    "intervalTime": [
      {
        "value":"option1",
        "id": 1
      },
      {
        "value":"option2",
        "id": 2
      },
      {
        "value":"option3",
        "id": 3
      }
    ]
  });
})

server.post('/basicInfoConfig', function (req, res) {
  res.json({
    "code": "OK"
  });
})

server.post('/securityConfig', function (req, res) {
  res.json({
    "code": "OK"
  });
})

server.post('/alertConfig', function (req, res) {
  res.json({
    "code": "OK"
  });
})

server.post('/issueConfig', function (req, res) {
  res.json({
    "code": "OK"
  });
})

// server.post('/basicInfoManage', function (req, res) {
//   res.json({
//     "basicInfoConfig": [
//       {"containerId": "22937203474450"},
//       {"containerId": "22937203474450"},
//       {"containerId": "22937203474450"},
//       {"containerId": "22937203474450"},
//       {"containerId": "22937203474450"}
//     ],
//     "alertConfig": [
//       {"maintenanceLocation" : "陕西西安天谷八路"},
//       {"maintenanceLocation" : "陕西西安天谷八路"},
//       {"maintenanceLocation" : "陕西西安天谷八路"},
//       {"maintenanceLocation" : "陕西西安天谷八路"},
//       {"maintenanceLocation" : "陕西西安天谷八路"}
//     ],
//     "issueConfig": [
//       {
//         "containerType": "标准云箱",
//         "alertCode": "0x11",
//         "alertType": "失联",
//         "alertLevel": "严重故障"
//       },
//       {
//         "containerType": "标准云箱",
//         "alertCode": "0x11",
//         "alertType": "失联",
//         "alertLevel": "严重故障"
//       },
//       {
//         "containerType": "标准云箱",
//         "alertCode": "0x11",
//         "alertType": "失联",
//         "alertLevel": "严重故障"
//       }
//     ]
//   });
// })

server.use(router)
console.log('Listening at 4000')
server.listen(4000)