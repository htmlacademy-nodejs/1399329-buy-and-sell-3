"use strict";

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.getById(offerId);

  if (!offer) {
    return next({
      code: HttpCode.NOT_FOUND,
      msg: `Offer with ${offerId} not found`,
    });
  }

  res.locals.offer = offer;
  return next();
};
