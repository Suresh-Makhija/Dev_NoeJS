'use strict';
const express = require('express');
const {dashboard, operationHistoryData, patientHistoryData,revenueData} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/dashboard', dashboard);
router.get('/operationHistoryData', operationHistoryData);
router.get('/patientHistoryData', patientHistoryData);
router.get('/revenueData',revenueData);

module.exports = {
    routes: router
}
