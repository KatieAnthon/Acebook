const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');

const PostsController = require("../controllers/posts");

// GET route can remain open for public access
router.get("/", PostsController.getAllPosts);

// POST route is now protected with tokenChecker middleware
router.post("/", tokenChecker, PostsController.createPost);

router.get("/userPost", tokenChecker, PostsController.getSinglePost);

router.delete("/posts/:postId", tokenChecker, PostsController.deletePost);

router.put("/posts/:postId", tokenChecker, PostsController.updatePost);


module.exports = router;
