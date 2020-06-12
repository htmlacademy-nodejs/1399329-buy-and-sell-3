"use strict";

const {HttpCode} = require(`../../../constants`);
const commentFields = require(`../../../constants/fields/comments`);

const commentFieldsKeys = Object.values(commentFields);

module.exports = (req, _, next) => {
  const createdComment = req.body;
  const createdCommentKeys = Object.keys(createdComment);

  if (!createdCommentKeys.length) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Comment can't be empty`});
  }

  const isValid = createdCommentKeys.every((key) =>
    commentFieldsKeys.includes(key)
  );

  if (!isValid) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Invalid comment`});
  }

  return next();
};
