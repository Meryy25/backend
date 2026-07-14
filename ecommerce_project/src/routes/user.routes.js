const express = require("express");
const authController = require("../controllers/user.controller");
const asyncHandler = require('../../utils/asyncHandler');
const { authMiddleware, validateMiddleware } = require('../middleware');
const { createUserSchema, loginSchema } = require('../zodValidations/user.validation');

const router = express.Router();

router.post('/register', validateMiddleware(createUserSchema), asyncHandler(authController.register));
router.post('/login', validateMiddleware(loginSchema), asyncHandler(authController.login));
router.get('/me', authMiddleware, asyncHandler(authController.currentUser));

module.exports = router;