const express = require('express');
const eventController = require('../controllers/events.controller');
const reviewController = require('../controllers/reviews.controller');
const attendanceController = require('../controllers/attendances.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { EventSchema, ReviewSchema } = require('../zodValidations');
const { 
    AuthMiddleware, 
    MemberMiddleware, 
    OrganizerMiddleware, 
    ValidationMiddleware,
} = require('../middlewares');

const router = express.Router();

router.get('/', asyncHandler(eventController.listAllEvents));
router.get('/:id', asyncHandler(eventController.eventById));
router.post(
    '/', 
    AuthMiddleware,
    OrganizerMiddleware,
    ValidationMiddleware(EventSchema),
    asyncHandler(eventController.createEvent));
router.patch(
    '/:id', 
    AuthMiddleware,
    OrganizerMiddleware,
    ValidationMiddleware(EventSchema),
    asyncHandler(eventController.updateEvent));
router.delete(
    '/:id', 
    AuthMiddleware,
    OrganizerMiddleware,
    asyncHandler(eventController.deleteEvent));

router.get(
    '/:id/reviews', 
    AuthMiddleware,
    asyncHandler(reviewController.getReview));
router.post(
    '/:id/reviews', 
    AuthMiddleware,
    MemberMiddleware,
    ValidationMiddleware(ReviewSchema),
    asyncHandler(reviewController.createReview));

router.post(
    '/:id/join',
    AuthMiddleware,
    MemberMiddleware,
    ValidationMiddleware(EventSchema),
    asyncHandler(attendanceController.joinEvent));
router.delete(
    '/:id/leave', 
    AuthMiddleware,
    MemberMiddleware,
    asyncHandler(attendanceController.leaveEvent));

module.exports = router;