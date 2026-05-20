const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const router= express.Router();
const userController = require('/Users/surajkadam/Desktop/CRUD/controllers/user.controller.js');
const middleware = require('/Users/surajkadam/Desktop/CRUD/middleware/auth.middleware.js')

router.post('/register',userController.register);
router.get('/:id',middleware,userController.getUser);
router.post('/login', userController.login);


module.exports = router;