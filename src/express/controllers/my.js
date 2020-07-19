'use strict';

const {getOffers} = require(`../api/offers`);

const myController = async (_, res, next) => {
  try {
    const result = await getOffers();
    res.render(`tickets/my-tickets`, {myOffers: result.data});
  } catch (error) {
    next(error);
  }
};

const myCommentsController = async (_, res, next) => {
  try {
    const offers = await getOffers();

    const ids = offers.data.slice(0, 3).map((offer) => ({
      id: offer.id,
      title: offer.title,
      sum: offer.sum,
      comments: offer.comments.slice(0, 3),
    }));

    res.render(`comments/comments`, {offers: ids});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  myController,
  myCommentsController,
};
