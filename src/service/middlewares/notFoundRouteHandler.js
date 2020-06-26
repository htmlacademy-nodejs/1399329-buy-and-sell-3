'use strict';

const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);

const logger = getLogger();

const NOT_FOUND_MSG_TEXT = `Not found`;

const notFoundRouteHandler = (req, res) => {
  res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_MSG_TEXT);
  logger.error(logMessages.getNotFoundRoute(req.originalUrl, res.statusCode));
};

module.exports = notFoundRouteHandler;
