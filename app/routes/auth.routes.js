const express = require('express');
const { signin, requestPasswordReset, resetPassword } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signin', signin);
router.post('/password-reset', requestPasswordReset);
router.post('/password-reset/:token', resetPassword);

module.exports = router;
