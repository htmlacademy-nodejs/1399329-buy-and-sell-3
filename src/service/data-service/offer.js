"use strict";

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants/generate`);
const {COMMENTS} = require(`../../constants/fields/offer`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const createdOffer = {
      id: nanoid(MAX_ID_LENGTH),
      [COMMENTS]: [],
      ...offer,
    };
    this._offers.push(createdOffer);

    return createdOffer;
  }

  drop(id) {
    this._offers = this._offers.filter((item) => item.id !== id);
  }

  getAll() {
    return this._offers;
  }

  getById(id) {
    return this._offers.find((item) => item.id === id);
  }

  update(id, oldOffer, newOffer) {
    const index = this._offers.findIndex((item) => item.id === id);
    const updatedOffer = {...oldOffer, ...newOffer};

    this._offers[index] = updatedOffer;
    return updatedOffer;
  }
}

module.exports = OfferService;
