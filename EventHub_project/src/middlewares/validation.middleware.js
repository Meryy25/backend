const { BadRequestError } = require("../errors");

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            throw new BadRequestError(
                "Validation failed",
                "VALIDATION_ERROR",
                errors
            );
        }

        req.body = result.data;

        next();
    };
};

module.exports = validationMiddleware;