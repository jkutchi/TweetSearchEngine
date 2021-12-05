const express = require('express');
const { getTweet } = require('../controllers/tweet.js');
const router = express.Router();

router.get('/:id', getTweet);

module.exports = router;