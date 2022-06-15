const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

// const getBoards = (req, res, next) => {
//   Board.find({}, "title _id createdAt updatedAt").then((boards) => {
//     res.json({
//       boards,
//     });
//   });
// };


// const getBoardById = (req, res) => {
//   const boardId = req.params.id;
//   Board.find({ _id: boardId })
//   .then((board) => res.json({ board }))
//   .catch((err) =>
//   next(new HttpError("Fetching board failed, please try again", 500))
// );
// };

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

exports.createList = createList;
