const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentsSchema = new mongoose.Schema({
  message:  String,
  date: { type: Date, default: Date.now },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postid: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  username: String,
  likes: {type:Array, default: []},
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Comments = mongoose.model("Comments", CommentsSchema)
module.exports = Comments;


