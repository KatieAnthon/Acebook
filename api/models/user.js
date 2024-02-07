const mongoose = require("mongoose");
// email and username must be unique
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilePic: { type: String },
  friend_list: [
    {
    username: {type: String },
    confirmed: { type: Boolean, default: false },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}]
});

const User = mongoose.model("User", UserSchema);
User.deleteMany({})
module.exports = User;
