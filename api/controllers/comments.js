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
      username: user.username
    });
    
    await comment.save(); 
    post.comments.push(comment);
    await post.save();

    res.status(201).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.find().populate('userid postid');
    console.log(comments)
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
   const postId = req.params.postId;
    
   const comments = await Comments.find({ postid: postId });
    console.log(comments)
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const CommentsController = {
    commentPost:commentPost,
    getAllComments:getAllComments,
    getCommentsByPostId:getCommentsByPostId
  };
  
module.exports = CommentsController;