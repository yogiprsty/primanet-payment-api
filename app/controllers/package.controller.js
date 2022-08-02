const { Package } = require('../models');

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

module.exports = {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
};
