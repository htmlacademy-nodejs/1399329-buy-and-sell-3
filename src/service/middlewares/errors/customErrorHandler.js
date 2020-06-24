'use strict';

const {getLogger, logMessages} = require(`../../logger`);
const formatJsonError = require(`../../lib/formatJsonError`);

const logger = getLogger();

const customErrorHandler = (err, _, res, next) => {
  if (err && err.code) {
    res.status(err.code).json(formatJsonError(err));
    logger.error(logMessages.getCustomError(err));
  } else {
    next(err);
  }
};

module.exports = customErrorHandler;

