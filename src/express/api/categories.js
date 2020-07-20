'use strict';

const api = require(`./core`);

const getCategories = async () => {
  try {
    return await api.get(`/categories`);
  } catch (error) {
    return {
      data: [],
    };
  }
};

module.exports = {
  getCategories,
};
