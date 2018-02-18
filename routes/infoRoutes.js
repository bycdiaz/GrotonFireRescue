const express = require('express');
const router = express.Router();

const infoController = require('../controllers/infoController');

router.get('/', infoController.index);
router.get('/groton', infoController.aboutGroton);
router.get('/groton/edit', infoController.editAboutGroton);

router.get('/fire-tax-district', infoController.aboutFireTaxDistrict);

router.get('/rescue-squad', infoController.aboutRescueSquad);


module.exports = router;