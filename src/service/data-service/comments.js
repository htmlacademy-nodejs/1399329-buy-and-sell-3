'use strict';

const {Op} = require(`sequelize`);

class CommentService {
  constructor(db) {
    this._model = db.Comment;
    this._db = db;
  }

  async create(offer, dataComment) {
    /*
      Создание комментария должно быть прикреплено к user.
      На данный момент никакой информации о пользователе нет.
    */
    const anonymous = await this._db.User.findByPk(1);

    const createdComment = await anonymous.createComment({
      ...dataComment,
      offerId: offer.id,
    });

    return createdComment.id;
  }

  async drop(offer, commentId) {
    await this._model.destroy({
      where: {
        [Op.and]: [{offerId: offer.id}, {id: commentId}],
      },
    });
  }

  async getAll(offer) {
    return await offer.getComments({
      include: [
        {association: `user`, attributes: [`name`, `surname`]},
      ]
    });
  }
}

module.exports = CommentService;
