'use strict';

const {Op} = require(`sequelize`);

class SearchService {
  constructor(db) {
    this._db = db;
  }

  async search(query) {
    const foundOffers = await this._db.Offer.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    return foundOffers;
  }
}

module.exports = SearchService;
