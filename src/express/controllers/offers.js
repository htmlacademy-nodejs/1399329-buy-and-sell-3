'use strict';

const fs = require(`fs`);
const {getCategories} = require(`../api/categories`);
const {addOffer, getOfferById} = require(`../api/offers`);
const {normalizeOfferFromBody, normalizeOfferToTemplate} = require(`../utils/normalizeOffer`);

const offerAddRenderController = async (_, res, next) => {
  try {
    const categories = await getCategories();
    res.render(`ticket/new-ticket`, {offer: normalizeOfferToTemplate({}), categories: categories.data});
  } catch (error) {
    next(error);
  }
};

const offerAddSendController = async (req, res) => {
  const {body, file} = req;
  const offer = {
    ...normalizeOfferFromBody(body, file),
    picture: file,
  };

  try {
    await addOffer(offer);
    res.redirect(`/my`);
  } catch (error) {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }

    const categories = await getCategories();
    res.render(`ticket/new-ticket`, {offer: normalizeOfferToTemplate(offer), categories: categories.data});
  }
};

const offerController = async (req, res, next) => {
  try {
    const {id} = req.params;
    const offer = await getOfferById(id);

    res.render(`ticket/ticket-edit`, {offer: offer.data});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  offerAddRenderController,
  offerAddSendController,
  offerController,
};
