const express = require('express');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const adminRouter = require('./admin.routes');

const router = express.Router();

// parsing json data
router.use(express.json());

router.use('/api/auth', authRouter);
router.use('/api/admin', adminRouter);
router.use('/api/user', userRouter);

module.exports = router;
