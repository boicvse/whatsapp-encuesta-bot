const wppconnect = require('@wppconnect-team/wppconnect');
const cron = require('node-cron');

const NOMBRE_GRUPO = 'ASISTENCIA TALLER Tx⚠️';

wppconnect.create({
  session: 'encuesta-bot',
  autoClose: 0,
  phoneNumber: '56933706906',
  puppeteerOptions: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  },
  catchLinkCode: (code) => {
    console.log('CODIGO_DE_VINCULACION:', code);
  },
  statusFind: (statusSession) => {
    console.log('ESTADO_SESION:', statusSession);
  }
})
.then((client) => start(client))
.catch((error) => console.error('ERROR_AL_INICIAR:', error));

function start(client) {
  console.log('BOT_INICIADO');

  client.getAllChats().then((chats) => {
    const grupo = chats.find(chat =>
      chat.isGroup && chat.name === NOMBRE_GRUPO
    );

    if (!grupo) {
      console.log('GRUPO_NO_ENCONTRADO');
      return;
    }

    const grupoID = grupo.id._serialized;

    console.log('GRUPO_ENCONTRADO');
    console.log('NOMBRE:', grupo.name);
    console.log('ID_DEL_GRUPO:', grupoID);

    cron.schedule(
      '0 22 * * *',
      async () => {
        try {
          await client.sendPollMessage(
            grupoID,
            '¿Marcarás asistencia?',
            [
              'Sí, yo lo hago😎',
              'Marquen por mi🤝🏼',
              'No, no marcaré❌'
            ],
            {
              selectableCount: 1
            }
          );

          console.log('ENCUESTA_ENVIADA_OK');
        } catch (error) {
          console.log('ERROR_ENVIANDO_ENCUESTA:', error);
        }
      },
      {
        timezone: 'America/Santiago'
      }
    );
  }).catch((error) => {
    console.log('ERROR_OBTENIENDO_CHATS:', error);
  });
}
