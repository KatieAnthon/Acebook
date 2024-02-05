const Message = require("../models/messages");

const createMessage = async (req, res) => {
  const { message, userid, username } = req.body;
  const newMessage = new Message({ message, userid, username });
  console.log(newMessage, req.body)
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error saving message" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('userid', 'username');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

const MessageController = {
    getMessages:getMessages,
    createMessage:createMessage,
  };

module.exports = MessageController;