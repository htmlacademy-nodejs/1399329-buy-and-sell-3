'use strict';

const express = require(`express`);
const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);
const {offerValidator, commentValidator} = require(`../middlewares/validation`);

const findOffer = require(`../middlewares/findOffer`);

const offersRouter = new express.Router();
const logger = getLogger();

module.exports = (apiRouter, service, commentService) => {
  apiRouter.use(`/offers`, offersRouter);

  offersRouter.get(`/`, async (req, res) => {
    const offers = await service.getAll();

    res.status(HttpCode.OK).json(offers);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.get(`/:offerId`, findOffer(service), (req, res) => {
    const {offer} = res.locals;

    res.status(HttpCode.OK).json(offer);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.post(`/`, offerValidator, async (req, res) => {
    const createdOffer = await service.create(req.body);

    res.status(HttpCode.CREATED).json(createdOffer);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.put(`/:offerId`, [offerValidator, findOffer(service)], async (req, res) => {
    const {offer: oldOffer} = res.locals;

    const updatedOffer = await service.update(oldOffer, req.body);

    res.status(HttpCode.OK).json(updatedOffer);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.delete(`/:offerId`, findOffer(service), async (req, res) => {
    const {offerId} = req.params;

    await service.drop(offerId);
    res.status(HttpCode.NO_CONTENT).send();

    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.get(`/:offerId/comments`, findOffer(service), async (req, res) => {
    const {offer} = res.locals;
    const comments = await commentService.getAll(offer);

    res.status(HttpCode.OK).json(comments);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.post(`/:offerId/comments`, [commentValidator, findOffer(service)], async (req, res) => {
    const {offer} = res.locals;
    const createdComment = await commentService.create(offer, req.body);

    res.status(HttpCode.CREATED).json(createdComment);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  offersRouter.delete(`/:offerId/comments/:commentId`, findOffer(service), async (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;

    commentService.drop(offer, commentId);
    res.status(HttpCode.NO_CONTENT).send();

    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });
};
