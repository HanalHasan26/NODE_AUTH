const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log(req.headers.authorization.split(" ")[1]);
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "hanal123");
      const user = await User.findById(decoded.id).select("-password");
      res.json(user)
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }


  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  
});

module.exports = { protect };