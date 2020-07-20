'use strict';

const express = require(`express`);
const upload = require(`../middlewares/upload`);
const {offerAddRenderController, offerAddSendController, offerController} = require(`../controllers/offers`);

const offersRouters = new express.Router();

offersRouters.get(`/category/:id`, (_, res) => res.render(`categories/category`));
offersRouters.get(`/add`, offerAddRenderController);
offersRouters.post(`/add`, upload.single(`avatar`), offerAddSendController);
offersRouters.get(`/edit/:id`, offerController);
offersRouters.get(`/:id`, (_, res) => res.render(`ticket/ticket`));

module.exports = offersRouters;
