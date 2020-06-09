"use strict";

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
  max: 16,
};

module.exports = {
  MAX_ID_LENGTH: 6,
  DEFAULT_COUNT: 1,
  MAX_OFFERS: 1000,
  MAX_DESCRIPTION_COUNT: 5,
  MAX_COMMENTS_COUNT: 6,
  FILE_NAME: `mocks.json`,
  OfferType,
  SumRestrict,
  PictureRestrict,
};
