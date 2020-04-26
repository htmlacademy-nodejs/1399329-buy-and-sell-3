'use strict';

const express = require(`express`);
const MainRoutes = new express.Router();

MainRoutes.get(`/`, (_, res) => res.send(`/`));
MainRoutes.get(`/register`, (_, res) => res.send(`/register`));
MainRoutes.get(`/login`, (_, res) => res.send(`/login`));
MainRoutes.get(`/search`, (_, res) => res.send(`/search`));

module.exports = MainRoutes;
