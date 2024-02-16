const express = require('express');
const router = express.Router();

// Dummy controller functions
const { getAllTags, getFrequentTags } = require('../controllers/tagsController');

router.get('/', getAllTags);
router.get('/frequent', getFrequentTags);

module.exports = router;
