'use strict';
const express = require('express');
const {dashboard, pieChart, patientHistoryData} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/dashboard', dashboard);
router.get('/piechartData', pieChart);
router.get('/patientHistoryData', patientHistoryData);

module.exports = {
    routes: router
}
