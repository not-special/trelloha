const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");


const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newList = {
      boardId: req.body.boardId,
      title: req.body.list.title,
      cards: [],
    }
    List.create(newList)
      .then((list) => {
        req.list = list;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addCardToList = (req, res, next) => {
  const card = req.card;
  const listId = req.body.listId;
  List.findByIdAndUpdate(listId, {
    $addToSet: { cards: card._id } // adds card to the cards array in list
  }).then(() => {
    next();
  });
};

const sendList = (req, res) => res.json(req.list)

exports.createList = createList;
exports.addCardToList = addCardToList;
exports.sendList = sendList;
