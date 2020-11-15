'use strict';

const createCategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    `category`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
    }
  );

  const createAssociations = function ({Offer}) {
    this.belongsToMany(Offer, {
      through: `offers_categories`,
      as: `offers`,
      foreignKey: `categoryId`,
    });
  };

  return {
    modelName: `Category`,
    model: Category,
    createAssociations,
  };
};

module.exports = createCategoryModel;
