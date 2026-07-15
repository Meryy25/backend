const AppError = require('./appError');

class BadRequestError extends AppError {
    constructor(message = 'Bad request error', errorCode = 'BAD_REQUEST') {
        super(message, 400, errorCode);
    }
};

module.exports = BadRequestError;