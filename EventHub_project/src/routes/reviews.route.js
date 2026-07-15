const express = require('express');
const reviewController = require('../controllers/reviews.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { AuthMiddleware } = require('../middlewares');

const router = express.Router();

router.delete(
    '/:id', 
    AuthMiddleware,
    asyncHandler(reviewController.deleteReview));

module.exports = router;