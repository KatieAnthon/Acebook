const mongoose = require("mongoose");
// email and username must be unique
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilePic: { type: String },
});

const User = mongoose.model("User", UserSchema);
User.deleteMany({})
module.exports = User;
