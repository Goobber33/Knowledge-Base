const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Import middleware functions
const {
    authMiddleware,
    errorMiddleware,
    requestLoggerMiddleware,
    validationMiddleware
} = require('./middleware/middleware');

// Import routes
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const smsRoutes = require('./routes/smsRoutes');
const tagRoutes = require('./routes/tagRoutes');

dotenv.config();

// Database connection
const dbConfig = require('./config/db');
dbConfig.connect();

const app = express();
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(requestLoggerMiddleware); // Using request logger middleware
app.use(authMiddleware); // Using authentication middleware


/* FILE STORAGE for image upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.use('/articles', articleRoutes);
app.use('/users', userRoutes);
app.use('/email', emailRoutes);
app.use('/sms', smsRoutes);
app.use('/tags', tagRoutes);

// Error middleware
app.use(errorMiddleware);

// Handle 404 - This is not a middleware but a catch-all route for unmatched routes
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));