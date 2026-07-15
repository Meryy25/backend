const { userSchema, loginSchema } = require('./user.validation');
const { eventSchema } = require('./event.validation');
const { reviewSchema } = require('./review.validation');

module.exports = {
    userSchema,
    loginSchema,
    eventSchema,
    reviewSchema,
};