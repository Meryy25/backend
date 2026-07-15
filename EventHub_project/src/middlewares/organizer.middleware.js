const { UnauthorizedError } = require('../errors');

const organizerMiddleware = (req, res, next) => {
    if(req.user.role !== 'organizer') {
        throw new UnauthorizedError('Only organizers can perform this action', 'UNAUTHORIZED');
    }

    next();
};

module.exports = organizerMiddleware;