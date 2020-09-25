'use strict';

const Sequelize = require(`sequelize`);
const {getLogger, logMessages} = require(`../logger`);
const {ExitCode} = require(`../../constants`);
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

const testConnectionDB = async () => {
  try {
    logger.info(logMessages.getStartConnectDB());

    await sequelize.authenticate();
    logger.info(logMessages.getEndConnectDB());
  } catch (error) {
    logger.error(logMessages.getErrorStartConnectDB(error));
    process.exit(ExitCode.error);
  }
};

module.exports = {
  testConnectionDB,
};
