'use strict';

const UserService = require(`./user`);
const CategoryService = require(`./category`);
const OfferService = require(`./offer`);
const CommentService = require(`./comments`);
const SearchService = require(`./search`);

module.exports = {
  UserService,
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
};
