const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController")
const { validateBoard, validateList, validateCard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards );

router.get('/boards/:id', boardsController.getBoardById );

router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList, listsController.createList, boardsController.addListToBoard, listsController.sendList );

router.post('/cards', validateCard, cardsController.createCard, listsController.addCardToList, cardsController.sendCard );

module.exports = router;