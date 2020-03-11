'use strict';

const log = require(`../console`);
const {
  DEFAULT_COUNT,
  MAX_OFFERS
} = require(`../../../constants/generate`);

const validateGenerateOffers = (offers) => {
  if (offers < 0) {
    log.error(`Минимальное число объявлений: ${DEFAULT_COUNT}`);
    return false;
  }

  if (offers > MAX_OFFERS) {
    log.error(`Не больше ${MAX_OFFERS} объявлений`);
    return false;
  }

  return true;
};

module.exports = {
  validateGenerateOffers
};
