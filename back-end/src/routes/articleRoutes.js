const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Articles route is working');
});

// Export the router
module.exports = router;
