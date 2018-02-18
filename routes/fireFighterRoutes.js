const express = require('express');
const router = express.Router();

const fireFighterController = require('../controllers/fireFighterController.js');

router.get('/', fireFighterController.fireFighters);

module.exports = router;