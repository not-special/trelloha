const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardController = require("../controllers/cardsController")
const { validateBoard, validateList, validateCard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards );

router.get('/board/:id', boardsController.getBoardById );

router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList, listsController.createList, boardsController.addListToBoard, listsController.sendList );

router.post('/cards', validateCard, cardController.createCard );

module.exports = router;