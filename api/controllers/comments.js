const Post = require("../models/post");
const User = require('../models/user');
const Comments = require("../models/comments");

const commentPost = async (req, res) => {
    try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const Comment = new Comments({
      message: req.body.content,
     
    });
      res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const getAllComments = async (req, res) => {
    try {
      const comments = await Comments.find();
      const token = generateToken(req.user_id);
      res.status(200).json({ comments: comments, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


const CommentsController = {
    commentPost:commentPost,
    getAllComments:getAllComments
  };
  
module.exports = CommentsController;