const Post = require("../models/post");
const User = require('../models/user');

const commentPost = async (req, res) => {
    try {
      const postId = req.params.postId; // Extract post ID from request parameters
      console.log("Post ID:", postId); // Log the Post ID
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.comments.push(req.body.message);
      await post.save(); // Save the updated post back to the database
  
      res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const CommentsController = {
    commentPost:commentPost
  };
  
  module.exports = CommentsController;