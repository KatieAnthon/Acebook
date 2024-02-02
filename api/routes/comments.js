const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const CommentsController = require("../controllers/comments");


router.post('/commentPost', tokenChecker, CommentsController.commentPost)

router.get('/comments', tokenChecker, CommentsController.getAllComments)

module.exports = router;
