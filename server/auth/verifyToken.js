const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.MY_SECRET, function(error, decoded) {
    if (error) return res.status(401).json("Invalid token");
    req.decoded = decoded;
    next();
  });
};

module.exports = VerifyToken;
