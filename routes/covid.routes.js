const express = require('express');

const { getAllDates } = require('../controllers/covid.controller');

const router = express.Router();

router.get('/', getAllDates);

module.exports = { datesRouter: router };
