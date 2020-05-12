'use strict';

const {HttpCode} = require(`../../constants`);
const NOT_FOUND_MSG_TEXT = `Not found`;

const notFoundHandler = (_, res) => {
  res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_MSG_TEXT);
};

module.exports = notFoundHandler;
