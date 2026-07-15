const attendanceService = require('../services/attendances.service');

const joinEvent = async (req, res) => {
    const join = await attendanceService.joinEvent(req.user.id, req.params.id);

    res.status(201).json({ message: 'User joined', join });
};

const leaveEvent = async (req, res) => {
    const leave = await attendanceService.leaveEvent(req.user.id, req.params.id);

    res.status(200).json({ message: 'User left', leave });
};

module.exports = {
    joinEvent,
    leaveEvent,
};