const express = require('express');

const router = express.Router();

const trainingController = require('../controllers/trainingController.js');

router.get('/', trainingController.trainingSchedule);
router.get('/new', trainingController.newTrainingDay);
router.post('/new', trainingController.createTrainingDay);

router.get('/:id/edit', trainingController.editTrainingDay);
router.post('/:id/edit', trainingController.updateTrainingDay);
router.post('/delete', trainingController.deleteTrainingDay); // Using AJAX

module.exports = router;
