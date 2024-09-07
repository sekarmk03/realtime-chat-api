const express = require('express');
const router = express.Router();
const { user } = require('../controllers');
const authorize = require('../middlewares/authorize');

router.get('/', authorize(), user.index);

module.exports = router;