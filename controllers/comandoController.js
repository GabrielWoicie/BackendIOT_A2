const mqttClient = require('../mqttClient');

// Função para lidar com comando "ler"
const comandoLer = (req, res) => {
  const comando = 'ler';
  console.log("Comando recebido:", comando);
  mqttClient.publish('rfid/comando', comando);
  console.log("Comando 'ler' enviado via MQTT");

  // Define handler
  const messageHandler = (topic, message) => {
    if (topic === 'rfid/leitura') {
      const payload = message.toString();

      // Remove listener e unsubscribe após primeira mensagem
      mqttClient.removeListener('message', messageHandler);
      mqttClient.unsubscribe('rfid/leitura');

      if (payload === 'interrompido') {
        console.log('Leitura interrompida recebida via MQTT');
        return res.json({ status: 'Leitura interrompida' });
      }

      try {
        const data = JSON.parse(payload);
        const uid = data.uid;
        console.log(`UID recebido: ${uid}`);
        return res.json({ uid });
      } catch (err) {
        console.error('Erro ao parsear mensagem:', err);
        return res.status(400).json({ error: 'Formato de mensagem inválido' });
      }
    }
  };

  mqttClient.subscribe('rfid/leitura', (err) => {
    if (!err) {
      mqttClient.on('message', messageHandler);
    } else {
      console.error('Erro ao se inscrever no tópico rfid/leitura:', err);
      return res.status(500).json({ error: 'Erro ao se inscrever no tópico' });
    }
  });
};

// Função para lidar com comando "parar"
const comandoParar = (req, res) => {
  const comando = 'parar';
  console.log("Comando recebido:", comando);
  mqttClient.publish('rfid/comando', comando);
  console.log("Comando 'parar' enviado via MQTT");
  res.json({ status: 'Leitura interrompida' });
};

module.exports = {
  comandoLer,
  comandoParar
};
