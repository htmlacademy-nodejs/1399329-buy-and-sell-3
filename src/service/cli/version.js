'use strict';

const packageJsonFile = require(`../../../package.json`);
const {VERSION} = require(`../../constants`).COMMANDS;

module.exports = {
  name: VERSION,
  run() {
    const version = packageJsonFile.version;
    console.info(version);
  }
};
