const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/users/:userId/increase-balance', adminController.increaseBalance);

router.post('/users/:userId/decrease-balance', adminController.decreaseBalance);

router.get('/total-balance', adminController.getTotalBalance);

router.post('/cryptocurrencies', adminController.addCryptocurrency);

router.post('/exchange-rate', adminController.manageExchangeRate);

module.exports = router;
