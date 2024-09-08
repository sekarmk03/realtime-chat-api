const express = require('express');
const router = express.Router();
const { message } = require('../controllers');
const authorize = require('../middlewares/authorize');

router.post('/', authorize(), message.create);

module.exports = router;