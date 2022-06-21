const HttpError = require("../models/httpError");
const Card = require("../models/card");
const { validationResult } = require("express-validator");

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newCard = {
      listId: req.body.listId,
      title: req.body.card.title,
    }
    Card.create(newCard)
      .then((card) => {
        req.card = card;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendCard = (req, res) => res.json(req.card);


const getCardById = (req, res) => {
  const cardId = req.params.id;
  Card.findOne({ _id: cardId })
  .then((card) => {
    return res.json(card)
  })
  .catch((err) =>
    next(new HttpError("Fetching card failed, please try again", 500))
  );
};

exports.createCard = createCard;
exports.sendCard = sendCard;
exports.getCardById = getCardById;
