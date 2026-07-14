const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
const NotAuthenticatedError = require('./notAuthenticatedError');
const NotFoundError = require('./notFoundError');
const UnauthorizedError = require('./unauthorizedError');
const ValidationError = require('./validationError');

module.exports = {
    BadRequestError,
    ConflictError,
    NotAuthenticatedError,
    NotFoundError,
    UnauthorizedError,
    ValidationError
};