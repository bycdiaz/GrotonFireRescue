const express = require('express');

const router = express.Router();

const trainingController = require('../controllers/trainingController.js');

router.get('/', trainingController.trainingSchedule);
router.get('/new', trainingController.editTrainingDay);
router.post('/new', trainingController.updateTrainingDay);

router.get('/edit/:id', trainingController.editTrainingDay);
router.post('/edit/:id', trainingController.updateTrainingDay);
router.post('/delete', trainingController.deleteTrainingDay); // Using AJAX

module.exports = router;
