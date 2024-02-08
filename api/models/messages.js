const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  senderId: String,
  recipientId: String,
  postId: String,
  senderUsername: String,
  receiverUsername:String,
  userPicute:String,
  receiverPicture:String
});
  
const Messages = mongoose.model("Message", MessageSchema);
module.exports = Messages;