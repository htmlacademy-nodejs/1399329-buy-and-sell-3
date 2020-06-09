"use strict";

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants/generate`);

class CommentService {
  create(offer, comment) {
    const createdComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    offer.comments.push(createdComment);
    return createdComment;
  }

  drop(offer, commentId) {
    offer.comments = offer.comments.filter((item) => item.id !== commentId);
    return;
  }

  getAll(offer) {
    return offer.comments;
  }
}

module.exports = CommentService;
