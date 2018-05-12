const express = require('express');

const router = express.Router();

const aboutController = require('../controllers/aboutController');
const authController = require('../controllers/authController');

router.get('/:pageName/edit', aboutController.editPage); // TODO - add authController.isLoggedIn,
router.post('/:pageName/edit', aboutController.updatePage); // TODO - add authController.isLoggedIn,
router.get('/:pageName', aboutController.showPage);


module.exports = router;
