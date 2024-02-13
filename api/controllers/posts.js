const Post = require("../models/post");
const User = require('../models/user');
const Comments = require('../models/comments');
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'comments',
      populate: {
        path: 'userid',
        model: 'User',
        select: 'username'
      }
    });
    // console.log(posts); // Add this line to log the posts to the console
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};    

const createPost = async (req, res) => {
  const message = req.body.message;
  const postImage = req.file ? req.file.path : ''; // Get the file path from Multer// multer is a lirary that we will need to add on our api end. 
  
  try {
    // Fetch the user's information using req.user_id
    const user = await User.findById(req.user_id);
    console.log('user:',user)
    console.log("body", req.body)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new post with the user's ID and username
    const newPost = new Post({
      message: req.body.content,
      user: user._id, // ObjectId of the user
      username: user.username, // Username of the user
      postImage:postImage,
      comments: [],
      userPorfilePicture: user.profilePic
    });
    await newPost.save();
    console.log(newPost)
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addUserLike = async(req,res) => {
  try {
    // find the liked post
    const post = await Post.findById(req.body.post_id);
    const user_id = req.user_id;
    const user = await User.findById(req.user_id)
    console.log(user)
    // if the likes array of that post doesn't include the id of the user who clicked it - add them to the array
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, username, profilePic } = user;

    // Check if the user has already liked the post
    const userLikedIndex = post.likes.findIndex(
      (like) => like.user_id.equals(req.user_id)
    );

    if (userLikedIndex === -1) {
      // If not liked, add the user to the likes array
      post.likes.push({
        user_id: _id,
        username: username,
        profilePic: profilePic,
      });
      await post.save();
      return res.status(200).json({ message: 'User added to likes successfully' });
    } else {
      // If already liked, remove the user from the likes array
      post.likes.splice(userLikedIndex, 1);
      await post.save();
      return res.status(200).json({ message: 'User unliked successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const userId = req.user_id; // or req.params.userId if you're getting the ID from the URL
    const userPosts = await Post.find({ user: userId }).populate('user', 'username');
    if (!userPosts.length) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    // Extract post ID from request parameters
    const postId = req.params.postId;
    
    // Fetch the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // console.log("Post:", post); // Log the Post object
    // Log the user ID for debugging
    // console.log("User ID from request:", req.user_id);
    // Check if the user making the request is the owner of the post
    if (post.user.toString() !== req.user_id) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    // Delete the post
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const postUpdateData = { message: req.body.content }; // Create an object with the update data
    console.log(req.file)

    // If there's a file, add its path to the update data

    if (req.file) {
      postUpdateData.postImage = req.file.path;
    }

    // Find the post and update it
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, user: req.user_id },
      { $set: postUpdateData },
      { new: true }
    );

    // If the post was not found, return a 404 error
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getSinglePost: getSinglePost,
  addUserLike: addUserLike,
  deletePost:deletePost,
  updatePost:updatePost,
  getPostById:getPostById,
};

module.exports = PostsController;

