"use strict";

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  search(query) {
    const resultSearch = this._offers.filter((item) => {
      const title = item.title.toLowerCase();
      return title.includes(query.toLowerCase());
    });

    return resultSearch;
  }
}

module.exports = SearchService;
