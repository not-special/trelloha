const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");


const createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newComment = {
      cardId: req.body.cardId,
      text: req.body.comment.text,
    }
    Comment.create(newComment)
      .then((comment) => {
        req.comment = comment;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendComment = (req, res) => res.json(req.comment)

exports.createComment = createComment;
exports.sendComment = sendComment;
