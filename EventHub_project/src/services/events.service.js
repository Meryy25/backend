const Event = require('../models/Event');
const { NotFoundError, UnauthorizedError } = require('../errors');

const listAllEvents = async () => {
    return Event.find();
};

const eventById = async (id) => {
    const event = await Event.findById(id);

    if(!event) {
        throw new NotFoundError('Event not found', 'NOT_FOUND');
    }

    return event;
};

const createEvent = async (userId, eventData) => {
    const newEvent = await Event.create({
        organizerId: userId,
        ...eventData,
    });

    return newEvent;
};

const updateEvent = async (id, userId, eventData) => {
    const event = await Event.findById(id);

    if(!event) {
        throw new NotFoundError('Event not found', 'NOT_FOUND');
    }

    if(event.organizerId.toString() !== userId) {
        throw new UnauthorizedError('Only organizer can update event', 'UNAUTHORIZED');
    }

    Object.assign(event, eventData);

    await event.save();

    return event;
};

const deleteEvent = async (id, userId) => {
    const event = await Event.findById(id);

    if(!event) {
        throw new NotFoundError('Event not found', 'NOT_FOUND');
    }

    if(event.organizerId.toString() !== userId) {
        throw new UnauthorizedError('Only organizer can delete event', 'UNAUTHORIZED');
    }    

    await Event.findByIdAndDelete(id);

    return event;
};

module.exports = {
    listAllEvents,
    eventById,
    createEvent,
    updateEvent,
    deleteEvent,
};