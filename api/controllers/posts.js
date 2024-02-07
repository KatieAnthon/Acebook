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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new post with the user's ID and username
    const newPost = new Post({
      message: req.body.content,
      user: user._id, // ObjectId of the user
      username: user.username, // Username of the user
      postImage:postImage,
      comments: []
    });
    await newPost.save();
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
    // if the likes array of that post doesn't include the id of the user who clicked it - add them to the array
  if (!post.likes.includes(req.user_id)) {
    post.likes.push(user_id)
    await post.save();
    return res.status(200).json({ message: "User added to likes successfully"});
    // if the likes array of that post includes the id of the user who clicked it - remove them from the array
  } else if (post.likes.includes(req.user_id)) {
    post.likes.pull(user_id)
    await post.save();
    return res.status(200).json({ message: "User unliked successfully"});
}
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

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
    const postUpdateData = { message: req.body.content };

    // there was an error, the post was only updating if an and a file were updated. issue now fixed. 
    if (req.file) {
      postUpdateData.postImage = req.file.path;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, user: req.user_id },
      { $set: postUpdateData },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log("Post:", post); // Log the Post object
    console.log("User ID from request:", req.user_id); // Log the user ID for debugging
    // Check if the user making the request is the owner of the post
    if (post.user.toString() !== req.user_id) {
      return res.status(403).json({ message: 'You are not authorized to update this post' });
    }
    // Perform the update
    const updateData = req.body; // Assuming the updated post data is sent in the request body
    await Post.updateOne({ _id: postId }, updateData);
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

