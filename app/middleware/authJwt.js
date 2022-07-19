require('dotenv').config();
const jwt = require('jsonwebtoken');
// const db = require('../models');

const key = process.env.SECRET_KEY;
// const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(403).send({
      message: 'No token provided!',
    });
  }
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: err,
        key,
      });
    } else {
      console.log(decoded);
      next();
    }
  });
};

module.exports = verifyToken;
