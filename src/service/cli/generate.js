'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle, toJSON} = require(`./utils`);
const {ExitCode, COMMANDS} = require(`../../constants.js`);

const {GENERATE} = COMMANDS;

const DEFAULT_COUNT = 1;
const MAX_OFFERS = 1000;
const MAX_DESCRIPTION_COUNT = 5;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16
};

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getPictureFileName = (restrict) => `item${getRandomInt(restrict.min, restrict.max)}.jpg`;

const getDescription = (descriptions, maxCount) => shuffle(descriptions).slice(1, maxCount).join(` `);

const getType = (types) => Object.keys(types)[Math.floor(Math.random() * Object.keys(types).length)];

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

module.exports = {
  name: GENERATE,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer < 0) {
      console.info(`Минимальное число объявлений: ${DEFAULT_COUNT}`);
      process.exit(ExitCode.error);
    }

    if (countOffer > MAX_OFFERS) {
      console.info(`Не больше ${MAX_OFFERS} объявлений`);
      process.exit(ExitCode.error);
    }

    const content = toJSON(generateOffers(countOffer), {});

    fs.writeFile(FILE_NAME, content, (error) => {
      if (error) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created. `);
    });
  }
};
