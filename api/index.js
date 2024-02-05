// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();
const http = require('http');
const { Server } = require('socket.io');
const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your requirements
  },
});

io.on('connection', (socket) => {
  // console.log('A user connected');

  // Example Socket.IO event
  socket.on('disconnect', () => {
    // console.log('User disconnected');
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
