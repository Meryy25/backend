const express = require("express");
const categoryController = require("../controllers/categories.controller");
const { authMiddleware, validateMiddleware, adminMiddleware } = require('../middleware');
const categorySchema = require('../zodValidations/category.validation');
const asyncHandler = require('../../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(categoryController.listAllCategories));
router.post(
    '/', 
    authMiddleware, 
    adminMiddleware,
    validateMiddleware(categorySchema),
    asyncHandler(categoryController.createCategory));
router.delete(
    '/:id', 
    authMiddleware,
    adminMiddleware,
    asyncHandler(categoryController.deleteCategory));

module.exports = router;