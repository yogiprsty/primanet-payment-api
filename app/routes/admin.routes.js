const express = require('express');
const { registerAdmin } = require('../controllers/admin.controller');
const { generatePayment, getAllPayments } = require('../controllers/payment.controller');
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/package.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

const router = express.Router();
router.post('/register', registerAdmin);

// package
router.post('/packages', [verifyToken, isAdmin], createPackage);
router.get('/packages', [verifyToken, isAdmin], getAllPackages);
router.get('/packages/:id', [verifyToken, isAdmin], getPackage);
router.put('/packages/:id', [verifyToken, isAdmin], updatePackage);
router.delete('/packages/:id', [verifyToken, isAdmin], deletePackage);

// user
router.post('/users', [verifyToken, isAdmin], createUser);
router.get('/users', [verifyToken, isAdmin], getAllUsers);
router.get('/users/:id', [verifyToken, isAdmin], getUser);
router.put('/users/:id', [verifyToken, isAdmin], updateUser);
router.delete('/users/:id', [verifyToken, isAdmin], deleteUser);

// payment
router.post('/generate-payments', [verifyToken, isAdmin], generatePayment);
router.get('/payments', [verifyToken, isAdmin], getAllPayments);
router.get('/home', [verifyToken, isAdmin], (req, res) => {
  res.send('Hello Admin');
});

module.exports = router;
