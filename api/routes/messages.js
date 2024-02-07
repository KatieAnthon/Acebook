const express = require("express");
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const MessageController = require("../controllers/messages");


router.post("/create",tokenChecker, MessageController.createMessage);


router.get("/usermessage",tokenChecker, MessageController.getMessagesByUser);


module.exports = router;
