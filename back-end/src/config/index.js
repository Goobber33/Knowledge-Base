const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    mongooseDebug: process.env.MONGOOSE_DEBUG || false,
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
    mongodbUri: process.env.MONGODB_URI,
    // Add other configurations as needed
};

module.exports = config;
