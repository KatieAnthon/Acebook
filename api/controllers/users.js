const User = require("../models/user");
const Post = require("../models/post")
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const profilePicUrl = req.file ? req.file.path : ''; // Get the file path from Multer// multer is a lirary that we will need to add on our api end. 

  const user = new User({ email, password, username, profilePic: profilePicUrl });

  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const getUsersInformation = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ username: user.username, email: user.email , profilePic: user.profilePic});
      
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFriendInformation = async (req, res) => {
  try {
    
    const user = await User.findOne({username: req.params.username});
    const user_id = user._id
    const userPosts = await Post.find({ user: user_id }).populate('user', 'username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ username: user.username, user_id: user._id, email: user.email , profilePic: user.profilePic, posts: userPosts});
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const UsersController = {
  create: create,
  getUsersInformation: getUsersInformation,
  getFriendInformation: getFriendInformation,
};

module.exports = UsersController;
