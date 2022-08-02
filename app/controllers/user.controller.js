const bcrypt = require('bcrypt');
const { User } = require('../models');

const saltRounds = 10;
// const { Op } = db.Sequelize;

const createUser = (req, res) => {
  const {
    phone, name, address, password, packageId, email,
  } = req.body;

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
    phone, name, address, password: hash, packageId, email,
  };
  User.create(user)
    .then((result) => {
      res.status(201);
      res.send({
        message: 'User created sucessfully',
        id: result.id,
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getProfile = (req, res) => {
  const { user } = req;
  res.send(user);
};

module.exports = { createUser, getProfile };
