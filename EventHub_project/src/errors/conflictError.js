const AppError = require('./appError');

class ConflictError extends AppError {
    constructor(message = 'Conflict error', errorCode = 'CONFLICT') {
        super(message, 409, errorCode);
    }
};

module.exports = ConflictError;