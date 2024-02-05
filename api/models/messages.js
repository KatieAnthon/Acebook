const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message:  String,
    date: { type: Date, default: Date.now },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String
  });
  
const Messages = mongoose.model("Message", MessageSchema)
module.exports = Messages;
