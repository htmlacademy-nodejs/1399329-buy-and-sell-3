'use strict';

const express = require(`express`);
const {myController, myCommentsController} = require(`../controllers/my`);

const myRoutes = new express.Router();

myRoutes.get(`/`, myController);
myRoutes.get(`/comments`, myCommentsController);

module.exports = myRoutes;
