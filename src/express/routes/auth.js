'use strict';

const express = require(`express`);
const authRoutes = new express.Router();

authRoutes.get(`/register`, (_, res) => res.render(`auth/sign-up`));
authRoutes.get(`/login`, (_, res) => res.render(`auth/login`));

module.exports = authRoutes;
