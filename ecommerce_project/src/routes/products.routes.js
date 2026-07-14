const express = require("express");
const productController = require("../controllers/products.controller");
const reviewController = require("../controllers/reviews.controller");
const { authMiddleware, validateMiddleware, adminMiddleware } = require('../middleware');
const productSchema = require('../zodValidations/product.validation');
const createReviewSchema = require('../zodValidations/review.validation');
const asyncHandler = require('../../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(productController.listAllProducts));
router.get('/:id', asyncHandler(productController.listOneProduct));
router.post(
    '/', 
    authMiddleware,
    adminMiddleware,
    validateMiddleware(productSchema),
    asyncHandler(productController.createProduct));
router.put(
    '/:id', 
    authMiddleware,
    adminMiddleware,
    validateMiddleware(productSchema),
    asyncHandler(productController.updateProduct));
router.delete(
    '/:id', 
    authMiddleware,
    adminMiddleware,
    asyncHandler(productController.deleteProduct));
router.get('/:id/reviews', asyncHandler(reviewController.listProductReviews));
router.post(
    '/:id/reviews',
    authMiddleware,
    validateMiddleware(createReviewSchema),
    asyncHandler(reviewController.createReview));

module.exports = router;