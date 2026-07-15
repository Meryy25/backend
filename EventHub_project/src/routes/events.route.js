const express = require('express');
const eventController = require('../controllers/events.controller');
const reviewController = require('../controllers/reviews.controller');
const attendanceController = require('../controllers/attendances.controller');
const asyncHandler = require('../../utils/asyncHandler');
const { eventSchema } = require('../zodValidations');
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
    ValidationMiddleware(eventSchema),
    asyncHandler(eventController.createEvent));
router.patch(
    '/:id', 
    AuthMiddleware,
    OrganizerMiddleware,
    ValidationMiddleware(eventSchema),
    asyncHandler(eventController.updateEvent));
router.delete(
    '/:id', 
    AuthMiddleware,
    OrganizerMiddleware,
    asyncHandler(eventController.deleteEvent));

router.get(
    '/:id/reviews', 
    asyncHandler(reviewController.getReview));
router.post(
    '/:id/reviews', 
    AuthMiddleware,
    MemberMiddleware,
    asyncHandler(reviewController.createReview));

router.post(
    '/:id/join',
    AuthMiddleware,
    MemberMiddleware,
    asyncHandler(attendanceController.joinEvent));
router.delete(
    '/:id/leave', 
    AuthMiddleware,
    MemberMiddleware,
    asyncHandler(attendanceController.leaveEvent));

module.exports = router;