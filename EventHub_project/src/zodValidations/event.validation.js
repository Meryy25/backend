const { z } = require('zod');

const eventSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, 'Title minimum length must be 3 characters')
        .max(50, 'Title maximum length must be 50 characters'),

    category: z.enum([
        "Music",
        "Sport",
        "Art",
        "Education",
        "Business",
    ]),

    description: z
        .string()
        .trim()
        .min(10, 'Description min length must be 10 characters')
        .max(1000, 'Description max length must be 1000 characters'),

    location: z
        .string()
        .trim()
        .min(1, 'Location is required'),

    startTime: z.coerce.date(),
    endTime: z.coerce.date(),

    capacity: z
        .number()
        .int()
        .min(1, 'Capacity must be greater than 0'),
})
.refine(
    (data) => data.endTime > data.startTime,
    {
        message: 'End time must be after start time',
        path: ['endTime'],
    }
);

module.exports = { eventSchema };