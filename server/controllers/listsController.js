const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");


const getListById = (req, res, next) => {
  const listId = req.body.listId;
  List.findOne({ _id: listId })
  .then((list) => {
    req.list = list;
    next();
  })
  .catch((err) =>
    next(new HttpError("Fetching list by ID failed, please try again", 500))
  );
};

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
  })
  .catch((err) =>
    next(new HttpError("Could not add new card, please try again", 500))
  );
};

const editList = (req, res, next) => {
  const listId = req.params.id;
  const { title, position } =  req.body;
  List.findOneAndUpdate({ _id: listId }, { title: title }, { new: true })
    .then((list) => {
      res.json(list);
    })
  .catch((err) =>
    next(new HttpError("Could not update list, please try again", 500))
  );
};

const sendList = (req, res) => res.json(req.list)

exports.createList = createList;
exports.addCardToList = addCardToList;
exports.sendList = sendList;
exports.editList = editList;
exports.getListById = getListById; 