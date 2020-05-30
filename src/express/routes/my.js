'use strict';

const express = require(`express`);
const myRoutes = new express.Router();

myRoutes.get(`/`, (_, res) => res.render(`tickets/my-tickets`));
myRoutes.get(`/comments`, (_, res) => res.render(`comments/comments`));

module.exports = myRoutes;
