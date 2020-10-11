'use strict';

const Sequelize = require(`sequelize`);
const {getLogger, logMessages} = require(`../logger`);
const {db} = require(`../../../config`);

const logger = getLogger({
  name: `server:db`,
  level: process.env.LOG_LEVEL || `info`,
});

const sequelize = new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
  host: db.DB_HOST,
  dialect: db.DB_DIALECT,
  // logging: msg => logger.debug(msg) // add custom logger?
});

const testConnectionDB = {
  run: async () => sequelize.authenticate(),
  dataBaseLogger: {
    start: () => logger.info(logMessages.getStartConnectDB()),
    end: () => logger.info(logMessages.getEndConnectDB()),
    error: (...args) => logger.error(logMessages.getErrorStartConnectDB(...args)),
  },
};

module.exports = {
  testConnectionDB,
};
