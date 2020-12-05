'use strict';

class UserService {
  constructor(model) {
    this._model = model;
  }

  async getAll() {
    return await this._model.findAll();
  }

  async getById(id) {
    return await this._model.findByPk(id);
  }
}

module.exports = UserService;
