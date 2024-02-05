const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message:  String,
    date: { type: Date, default: Date.now },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  });
  
const Messages = mongoose.model("Message", MessageSchema)
module.exports = Messages;
