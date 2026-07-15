const { UnauthorizedError } = require('../errors');

const memberMiddleware = (req, res, next) => {
    if(req.user.role !== 'member') {
        throw new UnauthorizedError('Only members can perform this action', 'UNAUTHORIZED');
    }

    next();
};

module.exports = memberMiddleware;