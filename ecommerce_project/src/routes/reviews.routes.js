const express = require("express");
const reviewController = require("../controllers/reviews.controller");
const { authMiddleware, adminMiddleware } = require('../middleware');
const asyncHandler = require('../../utils/asyncHandler');

const router = express.Router();

router.delete(
    '/:id',
    adminMiddleware,
    authMiddleware,
    asyncHandler(reviewController.deleteReview));

module.exports = router;