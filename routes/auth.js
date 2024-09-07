const express = require('express');
const router = express.Router();
const { auth } = require('../controllers');
const authorize = require('../middlewares/authorize');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/whoami', authorize(), auth.whoami);

module.exports = router;