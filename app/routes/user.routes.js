const express = require('express');
const { userAllPayments, userPayment } = require('../controllers/payment.controller');
const { getProfile } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authJwt');

const router = express.Router();

router.get('/home', [verifyToken], (req, res) => {
  res.send('Hello User');
});
router.get('/profile', [verifyToken], getProfile);
router.get('/payments', [verifyToken], userAllPayments);
router.get('/payments/:payment_id', [verifyToken], userPayment);

module.exports = router;
