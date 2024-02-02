const Post = require("../models/post");
const User = require('../models/user');
const Comments = require("../models/comments");

const commentPost = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await Post.findById(req.body.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comments({
      message: req.body.comment,
      userid: req.user_id, 
      postid: req.body.postId, 
    });

    await comment.save(); 

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.find().populate('userid postid');
    res.status(200).json({ comments });
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