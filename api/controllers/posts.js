const Post = require("../models/post");
const User = require('../models/user');
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').select('message');
    console.log(posts); // Add this line to log the posts to the console
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
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// find length of likes array for all posts
// const getPostLikes = async(req,res) =>{
//   try {
//     // Fetch the user's information using req.user_id
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find posts by user's ID and username
//     const findPosts = Post.find({user});

//     await newPost.save();
//     res.status(201).json({ message: 'Post created successfully', post: newPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const addUserLike = async(req,res) => {
  
  try {
    const post = await Post.findById(post_id);
    const user = await User.findById(req.user_id);
    console.log(post)

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  } else if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }else{
    post.likes.push(req.user_id)
    await post.save();
    return res.status(200).send("User added to likes successfully");
  }

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// get likes for all posts

// const getUserLikes = async(req,res) => {
//   console.log("controller")
//   try {
//     const user = await User.findById(req.user_id);

//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }
  
//   const findLikes = await Post.find("likes");

//   console.log(findLikes)

// }catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }



const getSinglePost = async (req, res) => {
  try {
    const userId = req.user_id; // or req.params.userId if you're getting the ID from the URL

    // Find posts by user's ID
    const userPosts = await Post.find({ user: userId }).populate('user', 'username');
    // console.log(userPosts)
    if (!userPosts.length) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.status(200).json({ posts: userPosts });
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
};

module.exports = PostsController;
