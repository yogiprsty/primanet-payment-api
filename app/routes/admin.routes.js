const express = require('express');
const {
  registerAdmin,
  createPackage,
  getAllUser,
} = require('../controllers/admin.controller');
const { generatePayment } = require('../controllers/payment.controller');
const { createUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

const router = express.Router();
router.post('/register', registerAdmin);

router.post('/users', [verifyToken, isAdmin], createUser);
router.post('/packages', [verifyToken, isAdmin], createPackage);
router.post('/generate-payment', [verifyToken, isAdmin], generatePayment);
router.get('/users', [verifyToken, isAdmin], getAllUser);
router.get('/home', [verifyToken, isAdmin], (req, res) => {
  res.send('Hello Admin');
});

module.exports = router;
