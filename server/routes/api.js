const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const { validateBoard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards );

// GET /api/board/:id endpoint
router.get('/board/:id', boardsController.getBoardById );


router.post('/boards', validateBoard, boardsController.createBoard );

module.exports = router;