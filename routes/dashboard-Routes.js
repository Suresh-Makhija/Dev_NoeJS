'use strict';
const express = require('express');
const {dashboard, operationHistoryData, patientHistoryData,revenueData,operationRevenueData,totalPatient,totalOperation} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/dashboard', dashboard);
router.get('/operationHistoryData', operationHistoryData);
router.get('/patientHistoryData', patientHistoryData);
router.get('/revenueData',revenueData);
router.get('/operationRevenueData',operationRevenueData);
router.get('/totalPatient',totalPatient);
router.get('/totalOperation',totalOperation);
module.exports = {
    routes: router
}
