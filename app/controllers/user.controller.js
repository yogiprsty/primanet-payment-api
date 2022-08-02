const bcrypt = require('bcrypt');
const { User, Package } = require('../models');

const saltRounds = 10;
// const { Op } = db.Sequelize;

const validateData = (req, res) => {
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
  return user;
};

const createUser = (req, res) => {
  const user = validateData(req, res);
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

const getAllUsers = (req, res) => {
  User.findAll({
    where: {
      isAdmin: 0,
    },
    include: [Package],
  })
    .then((result) => (res.send(result)))
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  User.findByPk(id, { includes: [Package] })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = validateData(req, res);
  User.update(user, {
    where: {
      id,
    },
  }).then(() => {
    res.send({ message: 'User Updated Successfully' });
  }).catch((err) => {
    res.status(500).send({
      message: err.message,
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id } })
    .then(() => {
      res.send({ message: 'User Deleted Successfully' });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  createUser,
  getProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
