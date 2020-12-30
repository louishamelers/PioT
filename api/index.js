var mqtt = require('mqtt')
var io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
})

var client  = mqtt.connect('mqtt://eu.thethings.network', {
    port: 1883,
    username: 'iot-plant-solution',
    password: 'ttn-account-v2.BmgSn0RYmHUlyNtJ79Ew73sTfoW4qgIG8db_cWuhWwM'
})

client.on('connect', function () {
  client.subscribe('iot-plant-solution/devices/lopy-tom/up', function (err) {
      if (err) {
        console.log(err);
      }
  })
})

client.on('message', function (topic, message) {
  // io.emit('sensor-data', JSON.parse(message.toString()));
  const jsonMessage = JSON.parse(message.toString());
  jsonMessage['status'] = 'needs watering';
  io.emit('sensor-data', jsonMessage);
  setInterval(function() {
    jsonMessage['metadata']['time'] = new Date();
    io.emit('sensor-data', jsonMessage);
  }, 3000)
})

io.on('connection', function() {
    console.log('A user connected');
})