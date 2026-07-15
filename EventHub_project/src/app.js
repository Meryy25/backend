const express = require('express');
const cookieParser = require('cookie-parser');
const {
    userRoutes,
    eventRoutes,
    reviewRoutes
} = require('./routes');
const {
    ErrorMiddleware,
    NotFoundMiddleware
} = require('./middlewares');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/reviews', reviewRoutes);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

module.exports = app;