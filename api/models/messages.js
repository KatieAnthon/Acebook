const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});
  
const Messages = mongoose.model("Message", MessageSchema);
module.exports = Messages;