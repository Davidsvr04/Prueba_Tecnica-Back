const express = require('express');
const { createTransactionController, getTransactionsByUserController } = require('../controllers/transactionController');

const router = express.Router();

router.post('/transactions', createTransactionController);
router.get('/transactions/:user_id', getTransactionsByUserController);

module.exports = router;