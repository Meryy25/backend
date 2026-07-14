const { z } = require('zod');

const categorySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional()
});

module.exports = categorySchema;