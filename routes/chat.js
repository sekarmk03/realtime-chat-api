const express = require('express');
const router = express.Router();
const { chat } = require('../controllers');
const authorize = require('../middlewares/authorize');

router.post('/', authorize(), chat.create);
router.get('/', authorize(), chat.getChats);
router.get('/:id', authorize(), chat.getChat);

module.exports = router;