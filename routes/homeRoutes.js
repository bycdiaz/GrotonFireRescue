const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController.js');

router.get('/', homeController.home);
router.get('/edit', homeController.editHome);
router.post('/', homeController.updateHome);

module.exports = router;

