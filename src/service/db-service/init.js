const {sequelize, initDb} = require('./index');

(async () => {
  await initDb();
  await sequelize.close();
})();
