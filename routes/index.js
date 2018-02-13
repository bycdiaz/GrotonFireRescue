const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController')

router.get('/', (req, res) => {res.render('homePage')});

module.exports = router;