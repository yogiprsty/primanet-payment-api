const express = require('express');
const { createUser } = require('../controllers/user.controller');
const verifyToken = require('../middleware/authJwt');

const router = express.Router();

router.post('/create', createUser);
router.get('/home', [verifyToken], (req, res) => {
  res.send('Hello User');
});

module.exports = router;
