'use strict';

const {getLogger, logMessages} = require(`../logger`);
const logger = getLogger();

module.exports = (req, _, next) => {
  logger.debug(logMessages.getStartRequest(req.originalUrl));
  next();
};
