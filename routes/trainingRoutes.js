const express = require('express');
const router = express.Router();

const trainingController = require('../controllers/trainingController.js');

router.get('/', trainingController.trainingSchedule);
router.get('/edit', trainingController.editTrainingSchedule);
router.get('/new', trainingController.createTrainingDay);

router.get('/:id/edit', trainingController.editTrainingDay);
router.post('/:id/edit', trainingController.updateTrainingDay);
router.post('/:id/delete', trainingController.deleteTrainingDay);

module.exports = router;