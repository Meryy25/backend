const AuthMiddleware = require('./auth.middleware');
const MemberMiddleware = require('./member.middleware');
const OrganizerMiddleware = require('./organizer.middleware');
const ValidationMiddleware = require('./validation.middleware');
const ErrorMiddleware = require('./error.middleware');
const NotFoundMiddleware = require('./notFound.middleware');

module.exports = {
    AuthMiddleware,
    MemberMiddleware,
    OrganizerMiddleware,
    ValidationMiddleware,
    ErrorMiddleware,
    NotFoundMiddleware,
};