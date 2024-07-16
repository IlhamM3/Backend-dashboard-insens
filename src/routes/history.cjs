const express = require('express')
const historyControllers = require('../controllers/history.cjs')
const router = express.Router()
const authorize = require('../middleware/auth.cjs');

// Definisikan setiap endpoint history
router.get('/proxHistory',authorize, historyControllers.getProxHistory)
router.get('/proxHistory1',authorize, historyControllers.getProxHistorylimit)
router.get('/pzemrHistory',authorize, historyControllers.getPzemrHistory)
router.get('/pzemsHistory',authorize, historyControllers.getPzemsHistory)
router.get('/pzemtHistory',authorize, historyControllers.getPzemtHistory)

module.exports = router