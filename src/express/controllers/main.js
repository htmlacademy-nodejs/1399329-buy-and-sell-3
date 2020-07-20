'use strict';

const {getOffers} = require(`../api/offers`);
const {LATEST_OFFERS_COUNT, DISCUSS_OFFERS_COUNT} = require(`../constants`).OffersView;

const mainController = async (_, res, next) => {
  try {
    const result = await getOffers();

    res.render(`main`, {
      latestOffers: result.data.slice(0, LATEST_OFFERS_COUNT),
      discussOffers: result.data.slice(0, DISCUSS_OFFERS_COUNT),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  mainController,
};
