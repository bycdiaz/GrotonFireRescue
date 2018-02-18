const express = require('express');
const router = express.Router();

const fireFighterController = require('../controllers/fireFighterController.js');

router.get('/', fireFighterController.fireFighters);

router.get('/edit', fireFighterController.editFirefightersForm);
router.post('/edit', fireFighterController.editFirefighters);

module.exports = router;