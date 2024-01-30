const User = require("../models/user");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const profilePicUrl = req.file ? req.file.path : ''; // Get the file path from Multer// multer is a lirary that we will need to add on our api end. 
  console.log("req.body:", req.body);  // Should log form fields other than file, , now working check to see what is passed in the database
  console.log("req.file:", req.file);  // Should log file information, now working check to see what is passed in the database

  const user = new User({ email, password,  profilePic: profilePicUrl });

  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const UsersController = {
  create: create,
};

module.exports = UsersController;
