const express = require('express');
const { getTweetsAdvanced } = require('../controllers/tweet.js');
const router = express.Router();

router.get('/:text/:topic/:location/:sentiment/:startDate/:endDate', getTweetsAdvanced);

module.exports = router;