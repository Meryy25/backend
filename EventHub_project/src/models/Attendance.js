const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
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
        joinedAt: {
            type: Date,
            default: Date.now(),
        },
    }, 
); 

//user cannot join to the same event two times
attendanceSchema.index(
    {
        userId: 1,
        eventId: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model("Attendance", attendanceSchema);