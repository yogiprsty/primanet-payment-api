const express = require('express');
const { registerAdmin } = require('../controllers/admin.controller');
const { createUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

const router = express.Router();
router.post('/register', registerAdmin);
router.post('/create/user', [verifyToken, isAdmin], createUser);
router.get('/home', [verifyToken, isAdmin], (req, res) => {
  res.send('Hello Admin');
});

module.exports = router;
