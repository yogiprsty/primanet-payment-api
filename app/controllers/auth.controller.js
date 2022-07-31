require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');

const User = db.users;
const key = process.env.SECRET_KEY;

const signin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        phone,
      },
    });
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      res.send('Invalid Username or Password');
    }
    jwt.sign({ id: user.id }, key, { expiresIn: '1h' }, (err, token) => {
      res.send({ token });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { signin };
