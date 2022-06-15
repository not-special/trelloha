const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");


const getCards = (req, res, next) => {
  Card.find({}, "title _id createdAt updatedAt").then((cards) => {
    res.json({
      cards,
    });
  });
};


const getCardById = (req, res) => {
  const cardId = req.params.id;
  Card.find({ _id: cardId })
  .then((card) => res.json({ card }))
  .catch((err) =>
  next(new HttpError("Fetching card failed, please try again", 500))
);
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.create(req.body.card)
      .then((card) => {
        Card.find({ _id: card._id }, "title _id createdAt updatedAt").then(
          (card) => res.json({ card })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getCards = getCards;
exports.getCardById = getCardById;
exports.createCard = createCard;
