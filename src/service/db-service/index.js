'use strict';

const Sequelize = require(`sequelize`);
const createModels = require('../models');
const {categories, users, types} = require(`./mock`);
const {getLogger, logMessages} = require(`../logger`);
const {db} = require(`../../../config`);

const logger = getLogger({
  name: `server:db`,
  level: process.env.LOG_LEVEL || `info`,
});

const sequelize = new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
  host: db.DB_HOST,
  dialect: db.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
  // logging: msg => logger.debug(msg) // add custom logger?
});

const authenticateDB = {
  run: async () => sequelize.authenticate(),
  dataBaseLogger: {
    start: () => logger.info(logMessages.getStartConnectDB()),
    end: () => logger.info(logMessages.getEndConnectDB()),
    error: (...args) => logger.error(logMessages.getErrorStartConnectDB(...args)),
  },
};

const models = createModels(sequelize);

const initDb = async () => {
  await sequelize.sync({force: true});
  console.info(`Структура БД успешно создана.`);

  try {
    await models.User.bulkCreate(users);
    await models.Category.bulkCreate(categories);
    await models.Type.bulkCreate(types);
  } catch (error) {
    console.log(`Catch bulkCreate`, error);
  }
};

module.exports = {
  sequelize,
  authenticateDB,
  db: models,
  initDb,
};
