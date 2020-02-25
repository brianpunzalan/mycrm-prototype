/* eslint-disable no-plusplus */
/* eslint-disable no-console */
require('dotenv').config();

const app = require('./app');
const getLogger = require('./libs/logger');

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  const logger = getLogger({
    level: process.env.LOG_LEVEL,
    format: process.env.LOG_FORMAT,
    label: process.env.LOG_LABEL,
    service: 'core',
  });
  logger.info(`Listening on port ${port}`);
});

const shutdown = () => {
  const waitForSocketsToClose = (counter) => {
    for (let i = 0; i < counter; i++) {
      setTimeout(() => {
        console.log(`Waiting ${(counter - i)} more ${(counter - 1) > 1 ? 'seconds' : 'second'} for all connections to close...`);
      }, 1000);
    }
  };

  // execute graceful shutdown
  waitForSocketsToClose(10);
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
};

// quit on ctrl+c when running docker in terminal
process.on('SIGINT', () => {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

const sockets = {};
let nextSocketId = 0;
server.on('connection', (socket) => {
  const socketId = nextSocketId++;
  sockets[socketId] = socket;

  socket.once('close', () => {
    delete sockets[socketId];
  });
});
