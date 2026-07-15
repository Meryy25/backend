const { verifyToken } = require('../../utils/tokenVerification');
const { NotAuthenticatedError } = require('../errors');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        throw new NotAuthenticatedError('Not authenticated', 'NOT_AUTHENTICATED');
    }

    try {
        const decoded = verifyToken(token);

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();

    } catch (error) {
        throw new NotAuthenticatedError('Invalid or expired token', 'NOT_AUTHENTICATED');
    }
};

module.exports = authMiddleware;