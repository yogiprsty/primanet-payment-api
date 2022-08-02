require('dotenv').config();
const bcrypt = require('bcrypt');
const { User, Package } = require('../models');

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

const createPackage = (req, res) => {
  const { name, price } = req.body;
  const internetPackage = { name, price };

  Package.create(internetPackage)
    .then((result) => {
      res.status(201);
      res.send({
        message: 'Package created sucessfully',
        id: result.id,
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getAllPackages = (req, res) => {
  Package.findAll()
    .then((result) => (res.send(result)))
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getPackage = (req, res) => {
  const { id } = req.params;
  Package.findByPk(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const updatePackage = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const internetPackage = { name, price };
  Package.update(internetPackage, {
    where: {
      id,
    },
  }).then(() => {
    res.send({ message: 'Package Updated Successfully' });
  }).catch((err) => {
    res.status(500).send({
      message: err.message,
    });
  });
};

const deletePackage = (req, res) => {
  const { id } = req.params;
  Package.destroy({ where: { id } })
    .then(() => {
      res.send({ message: 'Package Deleted Successfully' });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
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

module.exports = {
  registerAdmin,
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
  getAllUsers,
  getUser,
};
