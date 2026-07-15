require('dotenv').config({ quiet: true });

const {
    PORT,
    HOST,
    MONGO_URL,
    JWT_SECRET,
    JWT_EXPIRATION,
    BCRYPT_ROUNDS
} = process.env;

module.exports = {
    PORT,
    HOST,
    MONGO_URL,
    JWT_SECRET,
    JWT_EXPIRATION,
    BCRYPT_ROUNDS,
};