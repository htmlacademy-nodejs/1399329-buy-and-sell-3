'use strict';

const createTypeModel = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    `type`,
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
    this.hasMany(Offer, {
      foreignKey: `typeId`,
      as: `offers`,
    });
  };

  return {
    modelName: `Type`,
    model: Type,
    createAssociations,
  };
};

module.exports = createTypeModel;
