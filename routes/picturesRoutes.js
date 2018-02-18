const express = require('express');
const router = express.Router();

const pictureController = require('../controllers/pictureController');

router.get('/pictures', pictureController.pictures);

module.exports = router;