'use strict';

const fs = require(`fs`).promises;
const log = require(`./console`);
const {getRandomInt, shuffle, toJSON} = require(`./utils`);
const {ExitCode, COMMANDS} = require(`../../constants`);
const {
  DEFAULT_COUNT,
  MAX_DESCRIPTION_COUNT,
  FILE_NAME,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`../../constants/generate`);
const {
  TITLES,
  SENTENCES,
  CATEGORIES,
} = require(`../../constants/lists`);
const {validateGenerateOffers} = require(`./validation`);

const {GENERATE} = COMMANDS;

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getPictureFileName = (restrict) => `item${getRandomInt(restrict.min, restrict.max)}.jpg`;

const getDescription = (descriptions, maxCount) => shuffle(descriptions).slice(1, maxCount).join(` `);

const getType = (types) => {
  const props = Object.keys(types);
  return props[Math.floor(Math.random() * props.length)];
};

const getCategory = (categories) => shuffle(categories).slice(getRandomInt(0, categories.length - 1));

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: getTitle(TITLES),
    picture: getPictureFileName(PictureRestrict),
    description: getDescription(SENTENCES, MAX_DESCRIPTION_COUNT),
    type: getType(OfferType),
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: getCategory(CATEGORIES)
  }));
};

const writeContentToFile = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, content);
    log.success(`Operation success. File created.`);
  } catch (error) {
    log.error(`Can't write data to file...`);
    process.exit(ExitCode.error);
  }
};

module.exports = {
  name: GENERATE,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const isValidOffers = validateGenerateOffers(countOffer);

    if (!isValidOffers) {
      process.exit(ExitCode.error);
    }

    const content = toJSON(generateOffers(countOffer), {});
    writeContentToFile(FILE_NAME, content);
  }
};
