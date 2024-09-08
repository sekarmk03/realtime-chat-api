const express = require('express');
const router = express.Router();

const user = require('./user');
const auth = require('./auth');
const chat = require('./chat');
const message = require('./message');

router.use('/users', user);
router.use('/auth', auth);
router.use('/chats', chat);
router.use('/messages', message);

module.exports = router;