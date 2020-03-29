'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
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

const rootPath = process.cwd();
const FILE_SENTENCES_PATH = path.resolve(rootPath, `./data/sentences.txt`);
const FILE_TITLES_PATH = path.resolve(rootPath, `./data/titles.txt`);
const FILE_CATEGORIES_PATH = path.resolve(rootPath, `./data/categories.txt`);

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

const readContent = async (pathname) => {
  try {
    const content = await fs.readFile(pathname, `utf8`);
    return content.split(`\n`).filter(Boolean);
  } catch (error) {
    log.error(error);
    return [];
  }
};

const getContentFiles = async () => {
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const sentences = await readContent(FILE_SENTENCES_PATH);

  return {
    titles,
    categories,
    sentences
  };
};

const generateOffers = async (count) => {
  const {titles, categories, sentences} = await getContentFiles();

  return Array(count).fill({}).map(() => ({
    title: getTitle(titles),
    picture: getPictureFileName(PictureRestrict),
    description: getDescription(sentences, MAX_DESCRIPTION_COUNT),
    type: getType(OfferType),
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: getCategory(categories)
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
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const isValidOffers = validateGenerateOffers(countOffer);

    if (!isValidOffers) {
      process.exit(ExitCode.error);
    }

    const content = toJSON(await generateOffers(countOffer), {});
    await writeContentToFile(FILE_NAME, content);
  }
};
