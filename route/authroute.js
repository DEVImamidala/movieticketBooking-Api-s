const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
router.post('/create',authController.create);
router.post('/jio',authController.register_seats);
router.get('/done',authController.getid);
router.get('/seat',authController.seat);

module.exports =  router;