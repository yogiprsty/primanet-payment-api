const express = require('express');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

const router = express.Router();

// parsing json data
router.use(express.json());

router.use('/api/user', userRouter);
router.use('/api/auth', authRouter);

module.exports = router;
