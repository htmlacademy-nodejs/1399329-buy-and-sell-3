'use strict';

const express = require(`express`);
const {mainController} = require(`../controllers/main`);
const {searchController} = require(`../controllers/search`);

const mainRoutes = new express.Router();

mainRoutes.get(`/`, mainController);
mainRoutes.get(`/search`, searchController);

module.exports = mainRoutes;
