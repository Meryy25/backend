const { z } = require('zod');

const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    name: z.string().min(1)
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

module.exports = {
    createUserSchema,
    loginSchema
};