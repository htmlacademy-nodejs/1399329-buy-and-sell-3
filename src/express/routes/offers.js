'use strict';

const express = require(`express`);
const OffersRouters = new express.Router();

OffersRouters.get(`/category/:id`, (_, res) => res.send(`/offers/category/:id`));
OffersRouters.get(`/add`, (_, res) => res.send(`/offers/add`));
OffersRouters.get(`/edit/:id`, (_, res) => res.send(`/offers/edit/:id`));
OffersRouters.get(`/:id`, (_, res) => res.send(`/offers/:id`));

module.exports = OffersRouters;
