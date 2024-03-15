const express = require('express');
const AWS = require('aws-sdk');

// Mónica Mundo Constantino 223238
// Fundamento de Redes
// Configurar AWS SNS
AWS.config.update({
  region: 'us-east-1', // Region
  accessKeyId: 'TU_ACCESS_KEY_ID', // Access Key ID
  secretAccessKey: 'TU_SECRET_ACCESS_KEY' // Secret Access Key
});

const sns = new AWS.SNS();

const app = express();

// Ruta para enviar un mensaje mediante SNS
app.get('/enviar-mensaje', (req, res) => {
  const params = {
    Message: 'Este es un mensaje de prueba enviado mediante AWS SNS',
    TopicArn: 'ARN_DE_TU_TOPIC' // ARN
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.error('Error al enviar mensaje:', err);
      res.status(500).send('Error al enviar mensaje');
    } else {
      console.log('Mensaje enviado exitosamente:', data.MessageId);
      res.send('Mensaje enviado exitosamente');
    }
  });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
