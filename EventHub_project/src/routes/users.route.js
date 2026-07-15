const express = require('express');
const userController = require('../controllers/users.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { AuthMiddleware, ValidationMiddleware } = require('../middlewares');
const { userSchema, loginSchema } = require('../zodValidations');

const router = express.Router();

router.post(
    '/register', 
    ValidationMiddleware(userSchema),
    asyncHandler(userController.register));
router.post(
    '/login', 
    ValidationMiddleware(loginSchema),
    asyncHandler(userController.login));
router.get('/me', AuthMiddleware, asyncHandler(userController.me));

module.exports = router;