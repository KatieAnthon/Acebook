const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");

const app = express();

app.use(cors());

app.use("/posts", bodyParser.json(), tokenChecker, postsRouter);
app.use("/tokens", bodyParser.json(), authenticationRouter);
app.use("/users", usersRouter);
app.use('/uploads', express.static('uploads'));
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = app;
