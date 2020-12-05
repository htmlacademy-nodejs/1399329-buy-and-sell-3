'use strict';

const {Op} = require(`sequelize`);

class SearchService {
  constructor(offerService) {
    this._offerService = offerService;
  }

  async search(query) {
    const foundOffers = await this._offerService.getAll({
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
