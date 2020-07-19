'use strict';

const normalizeOfferToTemplate = (offer = {}) => {
  return {
    'ticket-name': offer.title || ``,
    'comment': offer.description || ``,
    'category': offer.category || [],
    'price': offer.sum || ``,
    'action': offer.type || `buy`,
  };
};

const normalizeOfferFromBody = (body = {}) => {
  const {category} = body;
  return {
    title: body[`ticket-name`],
    description: body.comment,
    category: Array.isArray(category) ? category : [category],
    sum: parseInt(body.price, 10),
    type: body.action,
  };
};

module.exports = {
  normalizeOfferToTemplate,
  normalizeOfferFromBody,
};
