const express = require('express');
const router = express.Router();

const { getAllTags, getFrequentTags } = require('../controllers/tagsController');

router.get('/', getAllTags);
router.get('/frequent', getFrequentTags);

module.exports = router;
