'use strict';

const express = require(`express`);
const OffersRouters = new express.Router();

OffersRouters.get(`/category/:id`, (_, res) => res.render(`categories/category`));
OffersRouters.get(`/add`, (_, res) => res.render(`ticket/new-ticket`));
OffersRouters.get(`/edit/:id`, (_, res) => res.render(`ticket/ticket-edit`));
OffersRouters.get(`/:id`, (_, res) => res.render(`ticket/ticket`));

module.exports = OffersRouters;
