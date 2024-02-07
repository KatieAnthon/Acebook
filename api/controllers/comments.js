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
      username: user.username,
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
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//not yet added/fixed
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Fetch the comment
    const comment = await Comments.findById(commentId).populate('userid');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user making the request is the owner of the comment
    if (comment.userid._id.toString() !== req.user_id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    // Find the post containing the comment
    const post = await Post.findOneAndUpdate(
      { 'comments._id': comment._id },
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    );

    // Delete the comment
    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//copied from posts addUserLike
const addLikeComment = async(req,res) => {
  try {
    const comment = await Comments.findById(req.body.comment_id);

    const user_id = req.user_id;
    
  if (!comment.likes.includes(req.user_id)) {
    comment.likes.push(user_id)
    await comment.save();
    return res.status(200).json({ message: "User added to likes successfully"});
  } else if (comment.likes.includes(req.user_id)) {
    comment.likes.pull(req.user_id)

    comment.likes.pull(user_id)
    await comment.save();
    return res.status(200).json({ message: "User unliked successfully"});
}
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const CommentsController = {
    commentPost:commentPost,
    getAllComments:getAllComments,
    getCommentsByPostId:getCommentsByPostId,
    addLikeComment:addLikeComment,
    deleteComment: deleteComment,
  };
  
module.exports = CommentsController;