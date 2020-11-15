'use strict';

class CategoryService {
  constructor(db) {
    this._model = db.Category;
  }

  async findAll() {
    return await this._model.findAll({raw: true});
  }
}

module.exports = CategoryService;
