const express = require('express');
const { verifyToken } = require('../middleware/authJwt');

const router = express.Router();

router.get('/home', [verifyToken], (req, res) => {
  res.send('Hello User');
});

module.exports = router;
