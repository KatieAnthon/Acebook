const Post = require("../models/post");
const User = require('../models/user');
const { generateToken } = require("../lib/token");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').select('message');
    // console.log(posts); // Add this line to log the posts to the console
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createPost = async (req, res) => {
  try {
    // Fetch the user's information using req.user_id
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new post with the user's ID and username
    const newPost = new Post({
      message: req.body.message,
      user: user._id, // ObjectId of the user
      username: user.username, // Username of the user
      image: { // image uploads
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    if (req.file) { // checking if image was included in request
      newPost.image.data = req.file.buffer;
      newPost.image.contentType = req.file.mimetype
    }

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getUserPosts  =  async(req,res) =>{
  try {
    // Fetch the user's information using req.user_id
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find posts by user's ID and username
    const findPosts = Post.find({user});

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getUserPosts: getUserPosts,
};

module.exports = PostsController;
