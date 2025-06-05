require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');
const mqttClient = require('./mqttClient');
const cors = require('cors');

const app = express();
app.use (cors());
app.use(express.json());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
