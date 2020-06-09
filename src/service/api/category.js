"use strict";

const express = require(`express`);
const {HttpCode} = require(`../../constants`);

const categoryRouter = new express.Router();

module.exports = (apiRouter, service) => {
  apiRouter.use(`/category`, categoryRouter);

  categoryRouter.get(`/`, (_, res) => {
    const categories = service.findAll();

    res.status(HttpCode.OK).json(categories);
  });
};
