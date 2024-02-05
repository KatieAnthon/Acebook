const Post = require("../models/post");
const User = require('../models/user');
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
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
      postImage:postImage
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const getUserPosts  =  async(req,res) =>{

const addUserLike = async(req,res) => {
  try {
    const post = await Post.findById(req.body.post_id);
    const user_id = req.user_id;
    
  if (!post.likes.includes(req.user_id)) {
    // db.student.update( { "subjects" : "gkn" },{ $push: { "achieve": 95 } });
    // db.collection(Post).updateOne( { "_id": req.body.post_id }, {$push: { "likes": req.user_id } }  ).done()
    post.likes.push(user_id)
    await post.save();
    console.log(post)
    return res.status(200).json({ message: "User added to likes successfully"});
    
  } else if (post.likes.includes(req.user_id)) {
    // post.likes.pull(req.user_id)

    post.likes.pull(user_id)
    await post.save();
    console.log(post)
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


const deletePost = async (req, res) => {
  try {
    // Extract post ID from request parameters
    const postId = req.params.postId;
    // console.log("Post ID:", postId); // Log the Post ID

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
    const postId = req.params.postId; // Extract post ID from request parameters
    console.log("Post ID:", postId); // Log the Post ID

    const post = await Post.findById(postId);
    if (!post) {
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

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getFriendPost = async (req, res) => {
  try {
    const username = req.params.username
    
    const user = await User.findOne({username: username})

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    
    }
    const posts = await Post.find({user_id: user.User})
    console.log(posts)
    // res.status(200).json({ posts: posts, token: token });
    res.status(200).json({ post: posts});
    
    
    
  } catch (error) {
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
};

module.exports = PostsController;