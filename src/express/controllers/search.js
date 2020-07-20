'use strict';

const {searchOffers} = require(`../api/offers`);

const searchController = async (req, res, next) => {
  const {query} = req.query;

  try {
    const {data: offers} = await searchOffers(query);
    res.render(`search/search-result`, {offers, total: offers.length});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchController,
};
