const express = require('express');
const mesinControllers = require('../controllers/mesin.cjs');
const router = express.Router();
const authorize = require('../middleware/auth.cjs');
// Definisikan setiap endpoint mesin

router.post('/signup', mesinControllers.signup);
router.post('/login', mesinControllers.login);
router.get('/mesin',authorize, mesinControllers.NameMesin);

module.exports = router