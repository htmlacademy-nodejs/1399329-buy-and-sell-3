'use strict';

const express = require(`express`);
const offersRouters = new express.Router();

offersRouters.get(`/category/:id`, (_, res) => res.render(`categories/category`));
offersRouters.get(`/add`, (_, res) => res.render(`ticket/new-ticket`));
offersRouters.get(`/edit/:id`, (_, res) => res.render(`ticket/ticket-edit`));
offersRouters.get(`/:id`, (_, res) => res.render(`ticket/ticket`));

module.exports = offersRouters;
