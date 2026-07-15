const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: "Route not found",
        errorCode: "NOT_FOUND",
    });
};

module.exports = notFoundMiddleware;