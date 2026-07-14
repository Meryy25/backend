const authService = require("../services/user.service");

const register = async (req, res) => {
    const user = await authService.register(req.body);

    res.status(201).json({ message: 'successed sign-up'});
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 36000000
    });

    res.status(200).json({ message: 'successed signin' });
};

const me = async (req, res) => {
    const user = await authService.me(req.user);

    res.status(200).json(user);
};

module.exports = {
    register,
    login,
    me
};