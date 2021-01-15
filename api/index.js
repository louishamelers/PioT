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


/**
 * On init subscribe to the topic
 */
client.on('connect', function () {
  client.subscribe('iot-plant-solution/devices/lopy-tom/up', function (err) {
      if (err) {
        console.log(err);
      }
  })
})


/**
 * On a uplink data event, send it trough to frontend
 */

client.on('message', function (topic, message) {
  this.lekker = message;
  const jsonMessage = JSON.parse(message.toString());
  // console.log(jsonMessage);
  io.emit('sensor-data', jsonMessage);
})

/**
 * On command from frontend send it trough to TheThingsNetwork 
 */

io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on('lights', function(data) {
    console.log(data);
    const message = { 
      port: 1,
      confirmed: false,
      schedule: 'replace'
    }
    message.payload_raw = Buffer.from(JSON.stringify(data)).toString('base64');

    client.publish("iot-plant-solution/devices/lopy-tom/down", JSON.stringify(message));
  });
})















// setInterval(function() {
  
//   console.log('publishing');
//   const message = { 
//     port: 1,
//     confirmed: false,
//     schedule: 'replace'
//   }

//   message.payload_raw = Buffer.from(JSON.stringify(1)).toString('base64');

//   client.publish("iot-plant-solution/devices/lopy-tom/down", JSON.stringify(message));
// }, 15000)


// // TTN downliank settings
// var dev_id = msg.topic; // from previous MQTT received message in this case;
// var dlPort = 3; // downlink prot inthis application
// var dlConfirmed = true;
// var dlScheduled = "replace"; // allowed values: "replace" (default), "first", "last"

// // MQTT settings
// msg.topic = "<ApplicationID>>/devices/" + dev_id + "/down";
// msg.qos = 0;
// msg.retain = false;

// // prepare RAW payload and convert to base64
// var payload_raw = Buffer.alloc(2, 0);
// payload_raw[1] = 0x03; // command for this application
// var base64data = payload_raw.toString('base64');

// // use payload fields
// var message = {
//     port: dlPort, 
//     confirmed: dlConfirmed, 
//     schedule: dlScheduled, 
//     payload_raw: base64data,
// }; 