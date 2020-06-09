"use strict";

const {HttpCode} = require(`../../../constants`);
const offerFields = require(`../../../constants/fields/offer`);

const offerFieldsKeys = Object.values(offerFields).filter((item) => item !== offerFields.COMMENTS);

module.exports = (req, _, next) => {
  const createdOffer = req.body;
  const createdOfferKeys = Object.keys(createdOffer);

  if (!createdOfferKeys.length) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Offer can't be empty`});
  }

  const isValid = createdOfferKeys.every((key) =>
    offerFieldsKeys.includes(key)
  );

  if (!isValid) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Invalid offer`});
  }

  return next();
};
