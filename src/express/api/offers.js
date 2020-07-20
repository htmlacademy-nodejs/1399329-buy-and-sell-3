'use strict';

const api = require(`./core`);

const getOffers = async () => {
  return await api.get(`/offers`);
};

const getOfferById = async (id) => {
  return await api.get(`/offers/${id}`);
};

const addOffer = async (offer) => {
  return await api.post(`/offers`, offer);
};

const searchOffers = async (query) => {
  return await api.get(`/search?query=${query || ``}`);
};

module.exports = {
  getOffers,
  getOfferById,
  addOffer,
  searchOffers,
};
