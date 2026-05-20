const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const router= express.Router();
const userController = require('/Users/surajkadam/Desktop/CRUD/controllers/user.controller.js');

router.post('/register',userController.register);
//router.post('/login',userController.login);
router.get('/:id',userController.getUser);
router.post('/login', userController.login);


module.exports = router;