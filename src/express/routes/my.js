'use strict';

const express = require(`express`);
const MyRoutes = new express.Router();

MyRoutes.get(`/`, (_, res) => res.render(`tickets/my-tickets`));
MyRoutes.get(`/comments`, (_, res) => res.render(`comments/comments`));

module.exports = MyRoutes;
