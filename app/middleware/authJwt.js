require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');

const key = process.env.SECRET_KEY;
const User = db.users;

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send({
      message: 'No Bearer Authorization Provided',
    });
  }

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
      });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.dataValues.isAdmin) {
      next();
      return;
    }
    return res.status(401).send({
      message: 'Require Admin Access',
    });
  });
};

module.exports = { verifyToken, isAdmin };
