const express = require('express')
const pzemControllers = require('../controllers/pzem.cjs')
const router = express.Router()
const authorize = require('../middleware/auth.cjs');
// Definisikan setiap endpoint pzem

router.post('/pzemr',authorize,  pzemControllers.postPzemR)
router.get('/pzemr',authorize,  pzemControllers.getPzemR)
router.get('/pzemr1',authorize,  pzemControllers.getPzemR1)

router.post('/pzems',authorize, pzemControllers.postPzemS)
router.get('/pzems',authorize, pzemControllers.getPzemS)
router.get('/pzems1',authorize, pzemControllers.getPzemS1)

router.post('/pzemt',authorize, pzemControllers.postPzemT)
router.get('/pzemt',authorize, pzemControllers.getPzemT)
router.get('/pzemt1',authorize, pzemControllers.getPzemT1)

module.exports = router