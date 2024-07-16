const express = require('express')
const {postBaterai, getBaterai} = require('../controllers/baterai.cjs')
const router = express.Router()
const authorize = require('../middleware/auth.cjs');
// Definisikan setiap endpoint baterai

router.post('/baterai',authorize, postBaterai);
router.get('/baterai',authorize, getBaterai);

module.exports = router