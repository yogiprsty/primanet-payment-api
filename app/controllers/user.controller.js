const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;
const User = db.users;
// const { Op } = db.Sequelize;

const createUser = (req, res) => {
  const { phone, password } = req.body;

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

  const user = { phone, password: hash };
  User.create(user)
    .then((result) => {
      res.status(201);
      res.send(`User created id: ${result.id}`);
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = { createUser };
