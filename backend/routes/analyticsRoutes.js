const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/summary').get(protect, getDashboardSummary);

module.exports = router;
