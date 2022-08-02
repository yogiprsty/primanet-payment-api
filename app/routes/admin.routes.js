const express = require('express');
const {
  registerAdmin,
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
  getAllUsers,
  getUser,
} = require('../controllers/admin.controller');
const { generatePayment } = require('../controllers/payment.controller');
const { createUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

const router = express.Router();
router.post('/register', registerAdmin);

// user
router.post('/users', [verifyToken, isAdmin], createUser);
router.get('/users', [verifyToken, isAdmin], getAllUsers);
router.get('/users/:id', [verifyToken, isAdmin], getUser);

// package
router.post('/packages', [verifyToken, isAdmin], createPackage);
router.get('/packages', [verifyToken, isAdmin], getAllPackages);
router.get('/packages/:id', [verifyToken, isAdmin], getPackage);
router.put('/packages/:id', [verifyToken, isAdmin], updatePackage);
router.delete('/packages/:id', [verifyToken, isAdmin], deletePackage);

// payment
router.post('/generate-payment', [verifyToken, isAdmin], generatePayment);
router.get('/home', [verifyToken, isAdmin], (req, res) => {
  res.send('Hello Admin');
});

module.exports = router;
