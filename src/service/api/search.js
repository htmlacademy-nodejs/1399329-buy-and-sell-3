'use strict';

const express = require(`express`);
const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);

const searchRouter = new express.Router();
const logger = getLogger();

module.exports = (apiRouter, service) => {
  apiRouter.use(`/search`, searchRouter);

  searchRouter.get(`/`, async (req, res) => {
    const {query} = req.query;
    const searchResult = await service.search(query);

    res.status(HttpCode.OK).json(searchResult);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });
};
