'use strict';

const createUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    `user`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
    }
  );

  const createAssociations = function ({Offer, Comment}) {
    this.hasMany(Offer, {
      foreignKey: `userId`,
      as: `offers`,
    });

    this.hasMany(Comment, {
      foreignKey: `userId`,
      as: 'comments',
    });
  };

  return {
    modelName: `User`,
    model: User,
    createAssociations,
  };
};

module.exports = createUserModel;
