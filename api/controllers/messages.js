const Message = require("../models/messages");
const User = require('../models/user');

const createMessage = async (req, res) => {
  // Use only the fields that are in the MessageSchema
  const { message, senderId, recipientId , post } = req.body;
  
  try {
    const newMessage = new Message({ message, senderId, recipientId, post });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error saving message" });
  }
};




const getMessagesByUser = async (req, res) => {
 
  const user = await User.findById(req.user_id);

  try {
    const messages = await Message.find({ recipientId: req.user_id})
      .populate('senderUsername', 'username')
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

const MessageController = {
    createMessage:createMessage,
    getMessagesByUser:getMessagesByUser
  };

module.exports = MessageController;