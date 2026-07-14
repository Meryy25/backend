const { User } = require('../../models');

const findByEmail = async (email) => {
    return await User.findOne({
        where: {
            email
        }
    });
};

const findById = async (userId) => {
    return await User.findByPk(userId);
};

const register = async (userData) => {
    return await User.create(userData);
};

module.exports = {
    findByEmail,
    findById,
    register
};