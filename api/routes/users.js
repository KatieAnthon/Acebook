const express = require("express");
const multer = require('multer');
const UsersController = require("../controllers/users");
const tokenChecker = require('../middleware/tokenChecker'); // Your token verification middleware


const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log("Multer destination function:", file); // Debugging log
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // console.log("Multer filename function:", file); // Debugging log
      cb(null, file.fieldname + '-' + Date.now() + require('path').extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });

// User creation route
router.post("/", upload.single('profilePic'), UsersController.create);

router.get("/userinfo",tokenChecker, UsersController.getUsersInformation);


module.exports = router;
