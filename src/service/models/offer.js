'use strict';

const createOfferModel = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    `offer`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sum: {
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

  const createAssociations = function ({User, Type, Comment, Category}) {
    this.belongsTo(User, {
      foreignKey: `userId`,
      as: `user`,
    });

    this.belongsTo(Type, {
      foreignKey: `typeId`,
      as: `type`,
    });

    this.hasMany(Comment, {
      foreignKey: `offerId`,
      as: `comments`,
    });

    this.belongsToMany(Category, {
      through: `offers_categories`,
      as: `categories`,
      foreignKey: `offerId`,
    });
  };

  return {
    modelName: `Offer`,
    model: Offer,
    createAssociations,
  };
};

module.exports = createOfferModel;
