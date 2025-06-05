const mqtt = require('mqtt');
const db = require('./db');

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe('rfid/leitura');
});

module.exports = client;
