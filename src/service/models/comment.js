'use strict';

const createCommentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    `comment`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      offerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
    }
  );

  const createAssociations = function ({User, Offer}) {
    this.belongsTo(User, {
      foreignKey: `userId`,
      as: `user`,
    });

    this.belongsTo(Offer, {
      foreignKey: `offerId`,
      as: `offer`,
    });
  };

  return {
    modelName: `Comment`,
    model: Comment,
    createAssociations,
  };
};

module.exports = createCommentModel;
