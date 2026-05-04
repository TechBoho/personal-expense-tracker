const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {

  console.log("HEADERS:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

    try {

      token = req.headers.authorization.split(' ')[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      req.user = await User.findById(decoded.userId).select('-password');

      console.log("USER:", req.user);

      next();

    } catch (error) {

      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: 'Not authorized'
      });
    }
  }

  if (!token) {

    return res.status(401).json({
      message: 'No token'
    });
  }
};