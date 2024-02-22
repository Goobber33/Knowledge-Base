const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Convert string to boolean
const toBoolean = (value) => value === 'true';

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    mongooseDebug: toBoolean(process.env.MONGOOSE_DEBUG || 'false'),
    jwtSecret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'default_secret' : undefined),
    mongodbUri: process.env.MONGODB_URI,
    // Add other configurations as needed
};

// Validate critical variables
if (!config.mongodbUri) {
    console.error('MONGODB_URI must be set');
    process.exit(1); // Exit the application if critical variables are not set
}

if (!config.jwtSecret) {
    console.error('JWT_SECRET is not set. Please set it in the environment variables.');
    process.exit(1);
}

module.exports = config;
