const Message = require("../models/messages");

const createMessage = async (req, res) => {
  // Use only the fields that are in the MessageSchema
  const { message, senderId, recipientId , post } = req.body;
  
  try {
    // Create a new message with the fields from your schema
    const newMessage = new Message({ message, senderId, recipientId, post });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error saving message" });
  }
};



const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'username')
      .populate('recipient', 'username')
      .populate('post');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

const getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('senderUsername', 'username')
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

const MessageController = {
    getMessages:getMessages,
    createMessage:createMessage,
    getMessagesByUser:getMessagesByUser
  };

module.exports = MessageController;