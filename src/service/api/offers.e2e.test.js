'use strict';

const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {createServer} = require(`../cli/server`);

const ROOT_PATH = `/api/offers`;
let server = null;

const mockOffer = {
  title: `Продам носки без пары`,
  picture: `item100.jpg`,
  description: `Товар в отличном состоянии. Пользовались всего два раза.`,
  type: `offer`,
  sum: 10000,
  category: [`Разное`],
};

const mockComment = {
  text: `new comment`,
};

const findElementById = (array, id) => array.find((item) => item.id === id);

beforeAll(async () => {
  server = await createServer();
});

describe(`Offers API end-points ( ${ROOT_PATH} )`, () => {
  describe(`Get all offers`, () => {
    it(`when get offers status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).get(ROOT_PATH);
      expect(res.status).toBe(HttpCode.OK);
    });

    it(`should return an array`, async () => {
      const res = await request(server).get(ROOT_PATH);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe(`Get offer by id`, () => {
    const wrongId = `wrongId`;
    let newOfferId;

    beforeAll(async () => {
      const newOfferResponse = await request(server).post(ROOT_PATH).send(mockOffer);

      newOfferId = newOfferResponse.body.id;
    });

    afterAll(async () => {
      await request(server).delete(`${ROOT_PATH}/${newOfferId}`);
    });

    it(`when get offer by id status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).get(`${ROOT_PATH}/${newOfferId}`);
      expect(res.status).toBe(HttpCode.OK);
    });

    it(`should return 404 if id doesn't exists`, async () => {
      const res = await request(server).get(`${ROOT_PATH}/${wrongId}`);
      expect(res.status).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Create offer`, () => {
    it(`when create offer status code should be ${HttpCode.CREATED}`, async () => {
      const res = await request(server).post(ROOT_PATH).send(mockOffer);
      expect(res.status).toBe(HttpCode.CREATED);
    });

    it(`should retrieve offer with fields id and comments`, async () => {
      const res = await request(server).post(ROOT_PATH).send(mockOffer);
      const id = res.body.id;

      const offerResponse = await request(server).get(`${ROOT_PATH}/${id}`);

      expect(id).toBe(offerResponse.body.id);
      expect(offerResponse.body).toHaveProperty(`id`);
      expect(offerResponse.body).toHaveProperty(`comments`);

      expect(Array.isArray(offerResponse.body.comments)).toBeTruthy();
    });

    it(`Should retrieve offer with title`, async () => {
      const res = await request(server).post(ROOT_PATH).send(mockOffer);
      const id = res.body.id;

      const offerResponse = await request(server).get(`${ROOT_PATH}/${id}`);
      expect(offerResponse.body.title).toBe(mockOffer.title);
    });

    it(`Should 400 because title property doesn't exists`, async () => {
      const {title, ...rest} = mockOffer;
      const invalidMockOffer = {name: title, ...rest};

      const res = await request(server).post(ROOT_PATH).send(invalidMockOffer);
      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`Should 400 because body is empty`, async () => {
      const res = await request(server).post(ROOT_PATH).send({});
      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Update offer`, () => {
    let newOfferId;

    beforeAll(async () => {
      const newOfferResponse = await request(server).post(ROOT_PATH).send(mockOffer);

      newOfferId = newOfferResponse.body.id;
    });

    afterAll(async () => {
      await request(server).delete(`${ROOT_PATH}/${newOfferId}`);
    });

    it(`when update offer status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).put(`${ROOT_PATH}/${newOfferId}`).send(mockOffer);

      expect(res.status).toBe(HttpCode.OK);
    });

    it(`should return an updated offer`, async () => {
      const updatedOffer = {...mockOffer, title: `Updated title`};

      const res = await request(server).put(`${ROOT_PATH}/${newOfferId}`).send(updatedOffer);

      const offerResponse = await request(server).get(`${ROOT_PATH}/${newOfferId}`);

      expect(res.body.id).toBe(newOfferId);
      expect(res.body.title).toBe(updatedOffer.title);
      expect(offerResponse.body.title).toBe(updatedOffer.title);
    });

    it(`should return 400 because title property doesn't exists`, async () => {
      const {title, ...rest} = mockOffer;
      const invalidMockOffer = {name: title, ...rest};

      const res = await request(server).put(`${ROOT_PATH}/${newOfferId}`).send(invalidMockOffer);
      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`should return 400 because body is empty`, async () => {
      const res = await request(server).put(`${ROOT_PATH}/${newOfferId}`).send({});

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`should return 404 if id is wrong`, async () => {
      const wrongId = `wrongId`;
      const res = await request(server).put(`${ROOT_PATH}/${wrongId}`).send(mockOffer);

      expect(res.status).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Delete offer`, () => {
    let newOfferId;

    beforeAll(async () => {
      const newOfferResponse = await request(server).post(ROOT_PATH).send(mockOffer);

      newOfferId = newOfferResponse.body.id;
    });

    it(`when delete offer status code should be ${HttpCode.NO_CONTENT}`, async () => {
      const res = await request(server).delete(`${ROOT_PATH}/${newOfferId}`).send(mockOffer);

      expect(res.status).toBe(HttpCode.NO_CONTENT);
    });

    it(`should return 404 if id is wrong`, async () => {
      const wrongId = `wrongId`;
      const res = await request(server).delete(`${ROOT_PATH}/${wrongId}`);

      expect(res.status).toBe(HttpCode.NOT_FOUND);
    });

    it(`after delete request for offer should return 404`, async () => {
      const removedOffer = await request(server).get(`${ROOT_PATH}/${newOfferId}`);
      expect(removedOffer.status).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`Offer comments API end-points ( ${ROOT_PATH}/{offerID}/comments )`, () => {
  let newOfferId;

  beforeAll(async () => {
    const newOfferResponse = await request(server).post(ROOT_PATH).send(mockOffer);

    newOfferId = newOfferResponse.body.id;
  });

  afterAll(async () => {
    await request(server).delete(`${ROOT_PATH}/${newOfferId}`);
  });

  describe(`Get offer comments`, () => {
    it(`when get offer comment status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).get(`${ROOT_PATH}/${newOfferId}/comments`);

      expect(res.status).toBe(HttpCode.OK);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe(`Create offer comment`, () => {
    it(`when create comment status code should be ${HttpCode.CREATED}`, async () => {
      const res = await request(server).post(`${ROOT_PATH}/${newOfferId}/comments`).send(mockComment);

      expect(res.status).toBe(HttpCode.CREATED);
    });

    it(`should retrieve offer with fields id and text`, async () => {
      const res = await request(server).post(`${ROOT_PATH}/${newOfferId}/comments`).send(mockComment);

      const commentsResponse = await request(server).get(`${ROOT_PATH}/${newOfferId}/comments`);

      const createdCommentId = res.body.id;
      const createdComment = findElementById(commentsResponse.body, createdCommentId);

      expect(res.body.id).toBe(createdComment.id);
      expect(createdComment).toHaveProperty(`id`);
      expect(createdComment).toHaveProperty(`text`);
      expect(createdComment.text).toBe(mockComment.text);
    });

    it(`Should 400 because text property doesn't exists`, async () => {
      const invalidMockComment = {title: mockComment.text};
      const res = await request(server).post(`${ROOT_PATH}/${newOfferId}/comments`).send(invalidMockComment);

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`Should 400 because body is empty`, async () => {
      const res = await request(server).post(`${ROOT_PATH}/${newOfferId}/comments`).send({});

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Delete offer comment`, () => {
    let newCommentId;

    beforeAll(async () => {
      const newCommentResponse = await request(server)
        .post(`${ROOT_PATH}/${newOfferId}/comments`)
        .send(mockComment);

      newCommentId = newCommentResponse.body.id;
    });

    it(`when delete comment status code should be ${HttpCode.NO_CONTENT}`, async () => {
      const res = await request(server).delete(`${ROOT_PATH}/${newOfferId}/comments/${newCommentId}`);

      expect(res.status).toBe(HttpCode.NO_CONTENT);
    });

    it(`after delete comment should not be in the offer comments list`, async () => {
      const commentsResponse = await request(server).get(`${ROOT_PATH}/${newOfferId}/comments`);
      const deletedComment = findElementById(commentsResponse.body, newCommentId);

      expect(deletedComment).toBeUndefined();
    });
  });
});
