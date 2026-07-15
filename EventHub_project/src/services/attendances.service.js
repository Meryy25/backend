const Attendance = require('../models/Attendance');
const Event = require("../models/Event");
const User = require("../models/User");
const { NotFoundError, ConflictError } = require('../errors');

const joinEvent = async (userId, eventId) => {
    const event = await Event.findById(eventId);
    
    if(!event) {
        throw new NotFoundError('Event does not exist', 'NOT_FOUND');
    }

    const alreadyJoined = await Attendance.findOne({ userId, eventId });

    if(alreadyJoined) {
        throw new ConflictError('User already joind this event', 'CONFLICT');
    }
    
    if(event.attendancesCount >= event.capacity) {
        throw new ConflictError('Event is full', 'FULL_EVENT');
    }

    const attendance = await Attendance.create({ userId, eventId });

    event.attendancesCount += 1;

    await event.save();

    return attendance;
};

const leaveEvent = async (userId, eventId) => {
    const event = await Event.findById(eventId);
    
    if(!event) {
        throw new NotFoundError('Event does not exist', 'NOT_FOUND');
    }

    const attendance = await Attendance.findByIdAndDelete({ userId, eventId });

    if(!attendance) {
        throw new NotFoundError('User did not join this event', 'NOT_FOUND');
    }

    event.attendancesCount -= 1;

    await event.save();

    return attendance;
};

module.exports = {
    joinEvent,
    leaveEvent,
};