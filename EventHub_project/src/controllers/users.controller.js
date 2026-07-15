const userService = require('../services/users.service');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = await userService.register({ name, email, password, role });

    res.status(201).json(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });

    res.cookie('token', user, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 3600000
    });
};

const me = async (req, res) => {
    const user = await userService.me(req.user);

    res.status(200).json(user);
};

module.exports = {
    register,
    login,
    me,
};