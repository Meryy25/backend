const { z } = require('zod');

const reviewSchema = z.object({
    rating: z
        .number()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating cannot be greater than 5'),

    comment: z
        .string()
        .min(3, 'Comment must contain at least 3 characters')
        .max(100, 'Comment cannot exceed 100 characters'),
});

module.exports = { reviewSchema };