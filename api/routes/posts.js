const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const multer = require('multer');

const PostsController = require("../controllers/posts");
const UsersController = require("../controllers/users");


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/post');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + require('path').extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST route is now protected with tokenChecker middleware
router.post("/", tokenChecker, upload.single('image'), PostsController.createPost);

router.get("/userPost", tokenChecker, PostsController.getSinglePost);

router.post("/likes", tokenChecker, PostsController.addUserLike);

router.delete("/posts/:postId", tokenChecker, PostsController.deletePost);

router.get("/", PostsController.getAllPosts);

router.get("/postbyid/:postId", tokenChecker, PostsController.getPostById);

router.patch("/editingPost/:postId", tokenChecker, upload.single('image'), PostsController.updatePost);

router.get("/:username",tokenChecker, UsersController.getFriendInformation);


module.exports = router;