const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentRouter = require ("./routes/comments")
const messageRouter = require ("./routes/messages")
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");
// need to install socket.io and socket.io-client


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/posts",  tokenChecker, postsRouter);
app.use("/tokens",  authenticationRouter);
app.use("/comments",  tokenChecker, commentRouter);
app.use("/users", usersRouter);
app.use('/uploads', express.static('uploads'));
app.use('/messages', tokenChecker, messageRouter);

// 404 Not Found Middleware
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error Handling Middleware
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = app;
