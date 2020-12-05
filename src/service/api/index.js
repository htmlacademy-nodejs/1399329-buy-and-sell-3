'use strict';

const express = require(`express`);

const category = require(`./category`);
const offers = require(`./offers`);
const search = require(`./search`);

const {
  UserService,
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const createApi = async (db) => {
  const apiRouter = new express.Router();

  const userService = new UserService(db.User);
  const categoryService = new CategoryService(db.Category);
  const offerService = new OfferService(db.Offer, categoryService, userService);
  const commentService = new CommentService(db.Comment, userService);
  const searchService = new SearchService(offerService);

  category(apiRouter, categoryService);
  offers(apiRouter, offerService, commentService);
  search(apiRouter, searchService);

  return apiRouter;
};

module.exports = createApi;
