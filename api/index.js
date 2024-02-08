// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();
const http = require('http');
const { Server } = require('socket.io');
const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");
const Message = require("../api/models/messages.js");
const User = require('../api/models/user.js');
const Post = require('../api/models/post.js');
const { Types } = require('mongoose'); 
const { getUserIdFromToken } = require('./lib/token'); 

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
}); 


io.on('connection', (socket) => {
  const token = socket.handshake.query.token;
  const userId = getUserIdFromToken(token); 
  if (userId) {
    socket.join(userId.toString()); // Make the socket join a room named after the user ID
  }
  socket.on('sendMessage', async ({ message, senderId, recipientId, postId, senderUsername, receiverUsername, userPicute, receiverPicture }) => {
    try {
      // Fetch the sender, recipient, and post based on their IDs
      const [sender, recipient, post] = await Promise.all([
        User.findById(senderId),
        User.findById(recipientId),
        Post.findById(postId),
      ]);
      if (!Types.ObjectId.isValid(senderId) || !Types.ObjectId.isValid(recipientId)) {
        console.error('Invalid ID format');
        socket.emit('sendMessageError', { error: 'Invalid ID format.' });
        return;
      }
      const messageData = {
        message: message,
        senderId: senderId, // Use the sender's ID
        recipientId: recipientId, // Use the recipient's ID
        postId: postId, // Use the post's ID
        receiverUsername:receiverUsername,
        senderUsername:senderUsername,
        userPicute:userPicute,
        receiverPicture:receiverPicture

      };
      const newMessage = new Message(messageData);
      newMessage.save()
        .then(savedMessage => {
          // Emit to sender
          io.to(senderId.toString()).emit('message', savedMessage);
          // Emit to recipient
          io.to(recipientId.toString()).emit('message', savedMessage);
        })
        .catch(err => {
          console.error('Error saving message:', err);
          // Inform the sender that the message failed to send
          socket.emit('sendMessageError', { error: 'Message failed to send.' });
        });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('sendMessageError', { error: 'Message failed to send.' });
    }
  });
});

const listenForRequests = () => {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
};

connectToDatabase().then(() => {
  listenForRequests();
});
