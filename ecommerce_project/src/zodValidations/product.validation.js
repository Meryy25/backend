const { z } = require('zod');

const productSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(1),
    stock: z.number().min(0)
});

module.exports = productSchema;