const User = require('../models/User');
const { ConflictError, NotFoundError, ValidationError } = require('../errors');
const { createToken } = require('../../utils');

const register = async (userData) => {
    const { firstName, lastName, email, password, role } = userData;

    const existing = await User.findOne({ email });

    if(existing) {
        throw new ConflictError('Email already exists', 'EMAIL_EXISTS');
    }

    const user = new User({ firstName, lastName, email, password, role });

    await user.save();

    return user;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if(!user) {
        throw new NotFoundError('User not found', 'NOT_FOUND');
    }

    const valid = await user.comparePass(password);

    if(!valid) {
        throw new ValidationError('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    const { id, role } = user;

    const token = createToken({ id, role });

    return token;
};

const me = async (userId) => {
    const user = await User.findById(userId);

    if(!user) {
        throw new NotFoundError('User not found', 'NOT_FOUND');
    }

    return user;
};

module.exports = {
    register,
    login,
    me,
};