'use strict';

const axios = require(`axios`).default;
const {baseURL} = require(`../../constants`);

const api = axios.create({
  baseURL,
});

module.exports = api;
