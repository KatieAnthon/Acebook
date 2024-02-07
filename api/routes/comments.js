const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const CommentsController = require("../controllers/comments");


router.post('/commentPost', tokenChecker, CommentsController.commentPost);

router.get('/comments', tokenChecker, CommentsController.getAllComments);

router.get('/byPost/:postId', tokenChecker, CommentsController.getCommentsByPostId);

router.post("/likes", tokenChecker, CommentsController.addLikeComment);

router.delete("/comments/:commentId", tokenChecker, CommentsController.deleteComment);

router.patch("/comments/:commentId", tokenChecker, CommentsController.updateComment);


//router.patch("/editcomment/:commentId", tokenChecker, CommentsController.updateComment);


module.exports = router;
