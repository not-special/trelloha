const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newCard = {
      listId: req.body.listId,
      title: req.body.card.title,
    }
    List.create(newCard)
      .then((list) => {
        List.find({ _id: list._id }, "title _id boardId createdAt updatedAt position").then(
          (list) => res.json({ list })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createCard = createCard;
