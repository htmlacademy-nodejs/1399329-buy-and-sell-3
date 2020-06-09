"use strict";

const formatJsonError = require(`../../lib/formatJsonError`);

const customErrorHandler = (err, _, res, next) => {
  if (err && err.code) {
    res.status(err.code).json(formatJsonError(err));
  } else {
    next(err);
  }
};

module.exports = customErrorHandler;
