const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Review", reviewSchema);