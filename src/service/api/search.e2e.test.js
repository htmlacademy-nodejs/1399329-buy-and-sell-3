'use strict';

const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {createServer} = require(`../cli/server`);

const ROOT_PATH = `/api/search`;
let server = null;

beforeAll(async () => {
  server = await createServer();
});

const mockOffer = {
  title: `Продам носки без пары`,
  picture: `item100.jpg`,
  description: `Товар в отличном состоянии. Пользовались всего два раза.`,
  type: `offer`,
  sum: 10000,
  category: [`Разное`],
};

describe(`Search API end-points ( ${ROOT_PATH} )`, () => {
  let offerResponse;

  beforeAll(async () => {
    const addedOfferResponse = await request(server).post(`/api/offers`).send(mockOffer);
    const newOfferResponse = await request(server).get(`/api/offers/${addedOfferResponse.body.id}`);

    offerResponse = newOfferResponse.body;
  });

  afterAll(async () => {
    await request(server).delete(`/api/offers/${offerResponse.id}`);
  });

  it(`when get offer with query status code should be ${HttpCode.OK}`, async () => {
    const res = await request(server).get(encodeURI(`${ROOT_PATH}?query=${mockOffer.title}`));
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  it(`response should contain added offer`, async () => {
    const res = await request(server).get(encodeURI(`${ROOT_PATH}?query=${mockOffer.title}`));
    expect(res.body).toEqual(expect.arrayContaining([offerResponse]));
  });

  it(`if get offer with empty query status code should be ${HttpCode.OK}`, async () => {
    const res = await request(server).get(encodeURI(`${ROOT_PATH}?query=${mockOffer.title}`));
    expect(res.statusCode).toBe(HttpCode.OK);
  });
});
