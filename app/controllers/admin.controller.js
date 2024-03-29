require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models');

const adminCode = process.env.ADMIN_CODE;
const saltRounds = 10;

const registerAdmin = (req, res) => {
  const {
    phone, name, password, code, email,
  } = req.body;
  if (code !== adminCode) {
    return res.status(401).send({
      message: 'Require Admin Code',
    });
  }
  // Minimum eight characters, at least one letter and one number
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const validPassword = passwordPattern.test(password);

  if (!phone) {
    return res.send('Invalid Phone Number');
  }
  if (!validPassword) {
    return res.send('Invalid Password');
  }

  const hash = bcrypt.hashSync(password, saltRounds);

  const user = {
    phone, name, password: hash, isAdmin: 1, email,
  };
  User.create(user)
    .then((result) => {
      res.status(201);
      res.send({
        message: 'Admin registered sucessfully',
        id: result.id,
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  registerAdmin,
};
