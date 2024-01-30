const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');

const PostsController = require("../controllers/posts");

// GET route can remain open for public access
router.get("/", PostsController.getAllPosts);

// POST route is now protected with tokenChecker middleware
router.post("/", tokenChecker, PostsController.createPost);

module.exports = router;
