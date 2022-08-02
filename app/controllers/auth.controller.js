require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Package } = require('../models');

const key = process.env.SECRET_KEY;

const signin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        phone,
      },
      include: [Package],
    });
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      res.send('Invalid Username or Password');
    }
    const authUser = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      package: user.package,
    };
    jwt.sign({ user: authUser }, key, { expiresIn: '1h' }, (err, token) => {
      res.send({ message: 'Login sucessfully', token });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { signin };
