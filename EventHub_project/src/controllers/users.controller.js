const userService = require('../services/users.service');

const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    const user = await userService.register({ firstName, lastName, email, password, role });

    res.status(201).json(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const token = await userService.login({ email, password });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 3600000
    });

    res.status(200).json({
        message: 'Login successful'
    });
};

const me = async (req, res) => {
    const user = await userService.me(req.user.id);

    res.status(200).json(user);
};

module.exports = {
    register,
    login,
    me,
};