const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json(boards);
  });
};


const getBoardById = (req, res) => {
  const boardId = req.params.id;
  Board.findOne({ _id: boardId })
  // .then(board => {
  //   console.log("result from FindOneBoard", board)
  //   return board;
  // })
  .populate({
    path: 'lists',
    populate: { path: 'cards'},
  })
  .then((board) => {
    return res.json(board)
  })
  .catch((err) =>
    next(new HttpError("Fetching board failed, please try again", 500))
  );
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addListToBoard = (req, res, next) => {
  const list = req.list;
  const boardId = req.body.boardId;
  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id } // adds list to the lists array in board
  }).then(() => {
    next();
  });
};


exports.getBoards = getBoards;
exports.getBoardById = getBoardById;
exports.createBoard = createBoard;
exports.addListToBoard = addListToBoard;
