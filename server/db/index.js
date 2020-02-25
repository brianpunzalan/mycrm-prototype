const db = require('./models');
const getLogger = require('../libs/logger');

const connection = () => {
  const logger = getLogger();

  // Check Database Connection
  db.sequelize.authenticate()
    .then(() => logger.info('Database Connection established'))
    .catch((err) => logger.error('Unable to connect to the database', err));

  if (process.env.NODE_ENV !== 'production') {
    // Synchronize any database changes
    db.sequelize.sync()
      .then(() => logger.info('Database synchronized.'));
  }

  return db;
};

module.exports = connection;
