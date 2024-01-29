const User = require("../models/user");

const create = (req, res) => {
  console.log('req.file: AFTERRRRRRRR', req.file);
  const email = req.body.email;
  const password = req.body.password;
  console.log('req.body:', req.body, email, password);
  console.log('req.file:', req.file);
  const profilePicUrl = req.file ? req.file.path : ''; // Get the file path from Multer

  const user = new User({ email, password, profilePicUrl });

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
