const express = require('express');

const router = express.Router();

const trainingController = require('../controllers/trainingController.js');
const authController = require('../controllers/authController.js');

router.get('/', trainingController.trainingSchedule);

router.use(authController.isLoggedIn);
router.get('/new', trainingController.editTrainingDay);
router.post('/new', trainingController.createTrainingDay);

// TODO - refactor so ID is first, then action

router.get('/edit/:id', trainingController.editTrainingDay);
router.post('/edit/:id', trainingController.updateTrainingDay);
router.post('/delete', trainingController.deleteTrainingDay); // Using AJAX; TODO - change to accept ID like edit routes

module.exports = router;
