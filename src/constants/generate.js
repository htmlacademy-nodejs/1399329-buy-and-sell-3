'use strict';

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16
};

module.exports = {
  DEFAULT_COUNT: 1,
  MAX_OFFERS: 1000,
  MAX_DESCRIPTION_COUNT: 5,
  FILE_NAME: `mocks.json`,
  OfferType,
  SumRestrict,
  PictureRestrict
};
