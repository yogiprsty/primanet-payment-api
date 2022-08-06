require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User, Package, PasswordReset } = require('../models');
const sendEmail = require('../mail/send-email');

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

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: 'Email not found' });
  }
  PasswordReset.destroy({ where: { email } });
  const newToken = {
    email,
    userId: user.id,
    token: crypto.randomBytes(32).toString('hex'),
  };
  PasswordReset.create(newToken)
    .then(async (token) => {
      const link = `${process.env.BASE_URL}/api/auth/password-reset/${token.token}`;
      await sendEmail(user.email, 'Password reset', { link });
      res.send({ message: 'Password reset link sent to your email account' });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  let { password } = req.body;
  password = bcrypt.hashSync(password, 10);
  const isTokenExist = await PasswordReset.findByPk(token);
  if (!isTokenExist) {
    return res.status(400).send('Invalid link or expired');
  }
  User.update({ password }, { where: { id: isTokenExist.userId } })
    .then(() => {
      PasswordReset.destroy({ where: { token } });
      res.send('Password reseted sucessfully');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = { signin, requestPasswordReset, resetPassword };
