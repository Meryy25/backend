const { z } = require('zod');

const createOrderSchema = z.object({
    status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
});

module.exports = createOrderSchema;