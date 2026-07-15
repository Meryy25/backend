const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/env');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to mongoDB');
    } catch (err) {
        console.log('MongoDB connection error', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;