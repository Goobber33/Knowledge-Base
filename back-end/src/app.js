const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Import middleware

const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// Assuming validateRequest is intended for future use when validations are implemented
// const validateRequest = require('./middleware/validateRequest');

// Import routes

const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const smsRoutes = require('./routes/smsRoutes');
const tagRoutes = require('./routes/tagRoutes');

// Load environment variables

dotenv.config();

// Database connection

const dbConfig = require('./config/db');
dbConfig.connect();

const app = express();

// Middlewares

app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware); // Logs each request to the console

// Routes
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/sms', smsRoutes);
app.use('/api/v1/tags', tagRoutes);

// Error handling middleware should be the last middleware used

app.use(errorMiddleware);

// Handle 404 - This is not a middleware but a catch-all route for unmatched routes

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
