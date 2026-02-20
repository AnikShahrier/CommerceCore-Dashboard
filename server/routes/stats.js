const express = require('express');
const router = express.Router();
const { getDashboardStats, getSalesChart } = require('../controllers/statsController');

router.get('/summary', getDashboardStats);
router.get('/sales-chart', getSalesChart);

module.exports = router;