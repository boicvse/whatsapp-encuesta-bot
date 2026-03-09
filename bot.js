const wppconnect = require('@wppconnect-team/wppconnect');
const cron = require('node-cron');

wppconnect.create({
  session: 'encuesta-bot',
  puppeteerOptions: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
})
.then((client) => start(client))
.catch((error) => console.error(error));

function start(client) {

  // horario de Chile: 19:00 todos los días
  cron.schedule('0 19 * * *', async () => {

    const grupo = 'ID_DEL_GRUPO@g.us';

    await client.sendPollMessage(grupo, {
      name: '¿Asistirás mañana al trabajo?',
      options: [
        { name: 'Sí' },
        { name: 'No' },
        { name: 'Llegaré tarde - Marco yo' }
      ]
    });

    console.log('Encuesta enviada');

  });

}
