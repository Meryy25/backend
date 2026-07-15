const app = require('./src/app');
const connectDB = require('./src/db');

const { PORT, HOST } = require('./config/env');

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});