const { z } = require('zod');

const userSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'Firstname minimum length is 2')
        .max(50, 'Firstname maximum length is 50'),

    lastName: z
        .string()
        .trim()
        .min(2, 'Lasname min length is 2')
        .max(50, 'Lastname max length is 50'),

    email: z.email(),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters'),

    role: z.enum(["member", "organizer"]),
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

module.exports = { userSchema, loginSchema };