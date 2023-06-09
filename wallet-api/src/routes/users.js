const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.post('/:userId/transfer', userController.transferCryptocurrency);

module.exports = router;
