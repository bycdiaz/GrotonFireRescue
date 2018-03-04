const express = require('express');
const router = express.Router();

const infoController = require('../controllers/infoController');

router.get('/', infoController.index);

router.get('/:page', infoController.aboutPage);
router.get('/:page/edit', infoController.editAboutPage);
router.post('/:page/edit', infoController.updateAboutPage);

module.exports = router;
