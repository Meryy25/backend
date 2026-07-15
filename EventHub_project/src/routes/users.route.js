const express = require('express');
const userController = require('../controllers/users.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { AuthMiddleware, ValidationMiddleware } = require('../middlewares');
const { UserSchema } = require('../zodValidations');

const router = express.Router();

router.post(
    '/register', 
    AuthMiddleware,
    ValidationMiddleware(UserSchema),
    asyncHandler(userController.register));
router.post(
    '/login', 
    AuthMiddleware,
    ValidationMiddleware(UserSchema),
    asyncHandler(userController.login));
router.post(
    '/logout',
    AuthMiddleware,
    ValidationMiddleware(UserSchema),
    asyncHandler(userController.logout));
router.get('/me', AuthMiddleware, asyncHandler(userController.me));

module.exports = router;