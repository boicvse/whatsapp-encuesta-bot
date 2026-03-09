const wppconnect = require('@wppconnect-team/wppconnect');
const cron = require('node-cron');

wppconnect.create().then((client) => start(client));

function start(client) {

  cron.schedule('0 19 * * *', () => {

    const grupo = 'ID_DEL_GRUPO@g.us';

    client.sendPollMessage(grupo, {
      name: '¿Asistirás mañana al trabajo?',
      options: [
        { name: 'Sí' },
        { name: 'No' },
        { name: 'Llegaré tarde, yo marco' }
      ]
    });

  });

}
