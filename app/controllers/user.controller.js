const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;
const User = db.users;
// const { Op } = db.Sequelize;

const createUser = (req, res) => {
  const { phone, password } = req.body;

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
