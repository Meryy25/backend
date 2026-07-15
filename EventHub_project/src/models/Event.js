const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        organizerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Music",
                "Sport",
                "Art",
                "Education",
                "Business"
            ],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 1000,
        },
        location: {
            type: String,
            trim: true,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        attendancesCount: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Event", eventSchema);