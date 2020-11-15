"use strict";

const express = require(`express`);

const category = require(`./category`);
const offers = require(`./offers`);
const search = require(`./search`);

const getMockData = require(`../lib/getMockData`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const createApi = async (db) => {
  const apiRouter = new express.Router();
  const mockData = await getMockData();

  category(apiRouter, new CategoryService(db));
  offers(apiRouter, new OfferService(db), new CommentService(db));
  search(apiRouter, new SearchService(db));

  return apiRouter;
};

module.exports = createApi;
