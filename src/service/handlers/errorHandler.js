'use strict';

const {HttpCode} = require(`../../constants`);
const log = require(`../cli/console`);

const INTERNAL_SERVER_MSG_TEXT = `Something went wrong`;

// eslint-disable-next-line  no-unused-vars
const errorHandler = (err, req, res, next) => {
  log.error(err, err.stack);
  res.status(HttpCode.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_MSG_TEXT);
};

module.exports = errorHandler;
