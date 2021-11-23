const express = require('express');
const { getTweets } = require('../controllers/tweet.js');
const router = express.Router();

router.get('/:query', getTweets);

module.exports = router;