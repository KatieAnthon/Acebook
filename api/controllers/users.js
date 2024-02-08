const User = require("../models/user");
const Post = require("../models/post")

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
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else if (user.friend_list.length === 0){
      res.json({ userid: user._id, username: user.username, email: user.email , profilePic: user.profilePic, friends: []});
    } else {
      res.json({ userid: user._id, username: user.username, email: user.email , profilePic: user.profilePic, friends: user.friend_list});
    }
      
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    // find the users entries of the sender and receiver
    const sender = await User.findById(req.user_id);
    const receiver = await User.findById(req.body.recipient_id);
    // stop a user from sending themself a friend request
    if (req.user_id === req.body.recipient_id) {
      return res.status(200).json({ message: "Friend request cannot be sent to yourself"});
    }
    // if a friend request hasn't been sent to that user, send
    const requestExists = receiver.friend_list.some(friend => friend.id.toString() === sender._id.toString() && !friend.confirmed);
    console.log("request exists", requestExists)
    if (!requestExists){
      // add friend request object to both users friend_list
      //sender.friend_list.push({id: receiver._id, confirmed: false})
      //await sender.save();
      receiver.friend_list.push({username: sender.username, id: sender._id, confirmed: false, friendProfilePic: sender.profilePic})
      await receiver.save();
      return res.status(200).json({ message: "Friend request sent successfully"});
    }else{
      return res.status(200).json({ message: "Friend request pending"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const friendRequestResponse = async (req, res) => {
  try {

    // find the users entries of the sender and receiver
    const sender = await User.findById(req.user_id);
    const receiver = await User.findById(req.body.user_id);
    const response = req.body.confirmed;
    //example test4 adding test1
              //receiver.friend_list.push({id: receiver._id, confirmed: true})
              //await receiver.save();
    // if friend request is accepted
    // if (response === true){
      // find the friend request object sent from sender to receiver and vice versa
    const sender_receiver_request = sender.friend_list.find((friend_request) => friend_request.id.toString() === req.body.user_id)
    const receiver_sender_request = receiver.friend_list.find((friend_request) => friend_request.id.toString() === req.user_id)
      // modify friend object of both users to true
    sender_receiver_request.confirmed = response
    receiver.friend_list.push({ confirmed: true, id: sender._id, username: sender.username, friendProfilePic: sender.profilePic})
    //receiver_sender_request.confirmed = response

    await sender.save();
    await receiver.save();
    return res.status(200).json({ message: "Friend request accepted successfully"});
    // }else{
    //   const sender_receiver_request = sender.friend_list.find((friend_request) => friend_request.id.toString() === req.body.user_id)
    //   const receiver_sender_request = receiver.friend_list.find((friend_request) => friend_request.id.toString() === req.user_id)
    //   // remove friend request
    //   await sender_receiver_request.remove();
    //   await sender.save();
    //   await receiver_sender_request.remove();
    //   await receiver.save();
    //   return res.status(200).json({ message: "Friend request denied"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllFriendRequests = async (req, res) => {
  try {
    const userId = req.user_id;
    const user = await User.findById(userId);
    

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{
      res.json({friend_list: user.friend_list});
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

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
  sendFriendRequest: sendFriendRequest,
  friendRequestResponse: friendRequestResponse,
  getAllFriendRequests: getAllFriendRequests,
  getFriendInformation: getFriendInformation,
};

module.exports = UsersController;
