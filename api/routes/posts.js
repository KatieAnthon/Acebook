const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const multer = require('multer');

const PostsController = require("../controllers/posts");


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log("Multer destination function:", file); // Debugging log
      cb(null, 'uploads/post');
    },
    filename: (req, file, cb) => {
      // console.log("Multer filename function:", file); // Debugging log
      cb(null, file.fieldname + '-' + Date.now() + require('path').extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });

// POST route is now protected with tokenChecker middleware
router.post("/", tokenChecker, upload.single('image'), PostsController.createPost);

router.get("/userPost", tokenChecker, PostsController.getSinglePost);

router.post("/likes", tokenChecker, PostsController.addUserLike);

router.delete("/posts/:postId", tokenChecker, PostsController.deletePost);

router.get("/", PostsController.getAllPosts);

router.patch("/editingPost/:postId", tokenChecker, PostsController.updatePost);

router.post('/commentPost', tokenChecker, PostsController.commentPost)

module.exports = router;