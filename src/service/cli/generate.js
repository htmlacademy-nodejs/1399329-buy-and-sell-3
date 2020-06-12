"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const log = require(`./console`);
const {getRandomInt, shuffle, toJSON} = require(`./utils`);
const {ExitCode, COMMANDS} = require(`../../constants`);
const {
  DEFAULT_COUNT,
  MAX_DESCRIPTION_COUNT,
  FILE_NAME,
  MAX_ID_LENGTH,
  MAX_COMMENTS_COUNT,
  OfferType,
  SumRestrict,
  PictureRestrict,
} = require(`../../constants/generate`);
const {
  CATEGORY,
  DESCRIPTION,
  PICTURE,
  TITLE,
  TYPE,
  SUM,
  COMMENTS,
} = require(`../../constants/fields/offer`);
const {TEXT} = require(`../../constants/fields/comments`);

const rootPath = process.cwd();
const FILE_SENTENCES_PATH = path.resolve(rootPath, `./data/sentences.txt`);
const FILE_TITLES_PATH = path.resolve(rootPath, `./data/titles.txt`);
const FILE_CATEGORIES_PATH = path.resolve(rootPath, `./data/categories.txt`);
const FILE_COMMENTS_PATH = path.resolve(rootPath, `./data/comments.txt`);

const {validateGenerateOffers} = require(`./validation`);

const {GENERATE} = COMMANDS;

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getPictureFileName = (restrict) =>
  `item${getRandomInt(restrict.min, restrict.max)}.jpg`;

const getDescription = (descriptions, maxCount) =>
  shuffle(descriptions).slice(1, maxCount).join(` `);

const getType = (types) => {
  const props = Object.keys(types);
  return props[Math.floor(Math.random() * props.length)];
};

const getCategory = (categories) =>
  shuffle(categories).slice(getRandomInt(0, categories.length - 1));

const generateComments = (comments, maxCount) => {
  const commentsCount = getRandomInt(0, maxCount);

  return Array(commentsCount)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      [TEXT]: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));
};

const readContent = async (pathname) => {
  try {
    const content = await fs.readFile(pathname, `utf8`);
    return content
      .split(`\n`)
      .filter(Boolean)
      .map((string) => string.trim());
  } catch (error) {
    log.error(error);
    return [];
  }
};

const getContentFiles = async () => {
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const comments = await readContent(FILE_COMMENTS_PATH);

  return {
    titles,
    categories,
    sentences,
    comments,
  };
};

const generateOffers = async (count) => {
  const {titles, categories, sentences, comments} = await getContentFiles();

  return Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      [TITLE]: getTitle(titles),
      [PICTURE]: getPictureFileName(PictureRestrict),
      [DESCRIPTION]: getDescription(sentences, MAX_DESCRIPTION_COUNT),
      [TYPE]: getType(OfferType),
      [SUM]: getRandomInt(SumRestrict.min, SumRestrict.max),
      [CATEGORY]: getCategory(categories),
      [COMMENTS]: generateComments(comments, MAX_COMMENTS_COUNT),
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
  },
};
