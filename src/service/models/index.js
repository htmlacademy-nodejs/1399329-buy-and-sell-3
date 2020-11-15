'use strict';

const {DataTypes} = require(`sequelize`);

const createUserModel = require('../models/user');
const createTypeModel = require('../models/type');
const createOfferModel = require('../models/offer');
const createCommentModel = require('../models/comment');
const createCategoryModel = require('../models/category');

const creatingModels = {
  createUserModel,
  createTypeModel,
  createOfferModel,
  createCommentModel,
  createCategoryModel,
};

const createModels = (sequelize) => {
  const models = {};
  const associations = {};

  Object.values(creatingModels).forEach((createModel) => {
    const {modelName, model, createAssociations} = createModel(sequelize, DataTypes);

    models[modelName] = model;
    associations[modelName] = createAssociations || null;
  });

  Object.keys(associations).forEach((modelName) => {
    const createAssociations = associations[modelName];

    if (!createAssociations || typeof createAssociations !== 'function') return;

    createAssociations.call(models[modelName], models);
  });

  return models;
};

module.exports = createModels;
