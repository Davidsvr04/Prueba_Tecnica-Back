const express = require('express');
const { createUserController, getUsersController } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUserController);
router.get('/users', getUsersController);

module.exports = router;