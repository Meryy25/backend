const authRepository = require('../repositories/user.repository');
const { NotFoundError, NotAuthenticatedError, ConflictError } = require('../errors');
const { hashPass, comparePass, generateToken } = require('../../utils');

const register = async (userData) => {
    const { email, password } = userData;

    const user = await authRepository.findByEmail(email);

    if(user) {
        throw new ConflictError('Email exists', 'EMAIL_CONFLICT');
    }

    const hashedPassword = await hashPass(password);

    userData.password = hashedPassword;

    return authRepository.register(userData);
};

const login = async (email, password) => {
    const user = await authRepository.findByEmail(email);

    if(!user) {
        throw new NotAuthenticatedError('Email or password incorrect', 'WRONG_EMAIL');
    }

    const comparing = await comparePass(password, user.password);

    if(!comparing) {
        throw new NotAuthenticatedError('Email or password incorrect', 'WRONG_PASS');
    }

    const { id, role } = user;

    const token = generateToken({ id, role });

    return token;
};

const me = async (userId) => {
    const user = await authRepository.findById(userId);

    if(!user) {
        throw new NotFoundError('User not found', 'USER_NOT_FOUND');
    }

    return user;
};

module.exports = {
    register,
    login,
    me
};