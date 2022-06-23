const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const { validateBoard, validateList, validateCard, validateComment } = require("../validators/validators");

router.get('/boards', boardsController.getBoards );

router.get('/boards/:id', boardsController.getBoardById );

router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList, listsController.createList, boardsController.addListToBoard, listsController.sendList );

router.post('/cards', validateCard, listsController.getListById, cardsController.createCard, listsController.addCardToList, cardsController.sendCard );

router.put('/lists/:id', validateList, listsController.editList );

router.get('/cards/:id', validateCard, cardsController.getCardById);

router.post('/comments', validateComment, commentsController.createComment, cardsController.addCommentsToCard, commentsController.sendComment);

router.put('/cards/:id', cardsController.editCard);

module.exports = router;