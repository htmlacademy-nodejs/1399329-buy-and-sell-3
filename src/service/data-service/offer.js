'use strict';

const {Op} = require(`sequelize`);

class OfferService {
  constructor(db) {
    this._model = db.Offer;
    this._db = db;
  }

  async getCategories(ids) {
    const categories = await this._db.Category.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    return categories;
  }

  async create(dataOffer) {
    /*
      Создание объявление должно быть прикреплено к user.
      На данный момент никакой информации о пользователе нет.
    */

    const anonymous = await this._db.User.findByPk(1);

    const {type, category, ...other} = dataOffer;
    const createdOffer = {...other, typeId: type};

    const offer = await anonymous.createOffer(createdOffer);
    const categories = await this.getCategories(category);

    await offer.addCategories(categories);

    return offer.id;
  }

  async drop(id) {
    await this._model.destroy({
      where: {id},
    });
  }

  async getAll() {
    return await this._model.findAll({
      include: [
        {association: `type`, attributes: [`id`, `name`]},
        {association: `categories`, attributes: [`id`, `name`], through: {attributes: []}},
      ],
    });
  }

  async getById(id) {
    return await this._model.findByPk(id, {
      include: [
        {
          association: `user`,
          attributes: [`name`, `surname`, `email`],
        },
        {association: `type`, attributes: [`id`, `name`]},
        {association: `categories`, attributes: [`id`, `name`], through: {attributes: []}},
      ],
      // raw: true,
      // Чтобы сохранить вложенность, иначе получается строка user.name
      // nest: true,
    });
  }

  async update(oldOffer, newDataOffer) {
    const {type, category, ...other} = newDataOffer;
    const updatedOffer = {...other, typeId: type};

    const offer = await oldOffer.update(updatedOffer);
    const categories = await this.getCategories(category);

    await offer.addCategories(categories);

    return offer.id;
  }
}

module.exports = OfferService;
