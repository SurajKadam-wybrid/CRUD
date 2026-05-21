const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const router= express.Router();
const userController = require('/Users/surajkadam/Desktop/CRUD/controllers/user.controller.js');
const middleware = require('/Users/surajkadam/Desktop/CRUD/middleware/auth.middleware.js')


const validate = require('/Users/surajkadam/Desktop/CRUD/middleware/validate.middleware.js');
const { registerSchema, loginSchema,updateSchema } = require('/Users/surajkadam/Desktop/CRUD/validations/user.validation.js');
router.post('/register',validate(registerSchema),userController.register);
router.post('/login', validate(loginSchema),userController.login);
router.get('/:id', middleware,userController.getUser);
router.put('/:id',middleware, validate(updateSchema), userController.updateUser);
router.delete('/:id', middleware, userController.deleteUser);


module.exports = router;