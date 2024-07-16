const express = require('express')
const proximityControllers = require('../controllers/proximity.cjs')
const router = express.Router()
const authorize = require('../middleware/auth.cjs');
// Definisikan setiap endpoint proximity

router.post('/proximity',authorize, proximityControllers.postProximity)
router.get('/proximity',authorize, proximityControllers.getProximity)
router.get('/proximity1',authorize, proximityControllers.getProximitylimit1)

module.exports = router