  const mongoose = require("mongoose");

  // A Schema defines the "shape" of entries in a collection. This is similar to
  // defining the columns of an SQL Database.
  const PostSchema = new mongoose.Schema({
    message:  String,
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    //profilePic: String,
    likes: { type: Array },
    postImage: { type: String },
    comments: {type: Array, default: []},
    userPorfilePicture: {type: String}
  });

  // We use the Schema to create the Post model. Models are classes which we can
  // use to construct entries in our Database.
  const Post = mongoose.model("Post", PostSchema)
  module.exports = Post;
