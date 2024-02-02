const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const CommentsController = require("../controllers/comments");


router.post('/commentPost', tokenChecker, CommentsController.commentPost)



module.exports = router;
