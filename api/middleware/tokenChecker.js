const JWT = require("jsonwebtoken");

// Middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    // Handle case where Authorization header is missing or doesn't start with "Bearer "
    res.status(401).json({ message: "Invalid or missing authorization header" });
    return;
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Authentication error" });
    } else {
      // Add the user_id from the payload to the req object.
      req.user_id = payload.user_id;
      next();
    }
  });
};

module.exports = tokenChecker;

module.exports = tokenChecker;
