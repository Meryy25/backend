const eventService = require('../services/events.service');

const listAllEvents = async (req, res) => {
    const events = await eventService.listAllEvents(req.query);

    res.send(events);
};

const eventById = async (req, res) => {
    const event = await eventService.eventById(req.params.id);

    res.send(event);
};

const createEvent = async (req, res) => {
    console.log('create event');
    const newEvent = await eventService.createEvent(req.user.id, req.body);

    res.status(201).send({ message: 'Event created', newEvent });
};

const updateEvent = async (req, res) => {
    const updated = await eventService.updateEvent(
        req.params.id,
        req.user.id,
        req.body
    );

    res.send({ message: 'Event updated', updated });
};

const deleteEvent = async (req, res) => {
    const deleted = await eventService.deleteEvent(req.params.id, req.user.id);

    res.send({ message: 'Event deleted', deleted});
};

module.exports = {
    listAllEvents,
    eventById,
    createEvent,
    updateEvent,
    deleteEvent,
};