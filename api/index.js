// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();
const http = require('http');
const { Server } = require('socket.io');
const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");
const Message = require("../api/models/messages.js");
const User = require('../api/models/user.js');
const Post = require('../api/models/post.js');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your requirements
  },
});

io.on('connection', (socket) => {
  const token = socket.handshake.query.token;
  socket.on('joinRoom', ({ userId }) => {
    socket.join(userId);
  });
  socket.on('sendMessage', async ({ senderId, recipientId, text, postId }) => {
    console.log(senderId, recipientId, text, postId)
    try {
      // Fetch the sender, recipient, and post based on their IDs
      const [sender, recipient, post] = await Promise.all([
        User.findById(senderId),
        User.findById(recipientId),
        Post.findById(postId),
      ]);
      if (!sender || !recipient || !post) {
        console.error('User or post not found');
        // Inform the sender that the message failed to send
        socket.emit('sendMessageError', { error: 'Message failed to send.' });
        return;
      }

      const messageData = {
        sender: sender._id, // Use the sender's ID
        recipient: recipient._id, // Use the recipient's ID
        message: text,
        post: post._id, // Use the post's ID
        userid: sender._id, // You can set userid as sender's ID or as needed
        username: sender.username, // Use sender's username
      };

      const newMessage = new Message(messageData);
      newMessage.save()
        .then(savedMessage => {
          // Emit to sender
          socket.to(senderId).emit('message', savedMessage);
          // Emit to recipient
          socket.to(recipientId).emit('message', savedMessage);
        })
        .catch(err => {
          console.error('Error saving message:', err);
          // Inform the sender that the message failed to send
          socket.emit('sendMessageError', { error: 'Message failed to send.' });
        });
    } catch (error) {
      console.error('Error sending message:', error);
      // Inform the sender that the message failed to send
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
