const AppError = require('./appError');

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', errorCode = 'UNAUTHORIZED') {
        super(message, 403, errorCode);
    }
};

module.exports = UnauthorizedError;