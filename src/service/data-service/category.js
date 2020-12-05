'use strict';

class CategoryService {
  constructor(model) {
    this._model = model;
  }

  async getAll(options = {raw: true}) {
    return await this._model.findAll(options);
  }
}

module.exports = CategoryService;
