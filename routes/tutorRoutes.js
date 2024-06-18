const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, tutorController.getAllTutores);
// Otros endpoints protegidos por authMiddleware
// router.get('/:id', authMiddleware, tutorController.getTutorById);
// router.post('/', authMiddleware, tutorController.createTutor);
// router.put('/:id', authMiddleware, tutorController.updateTutor);
// router.delete('/:id', authMiddleware, tutorController.deleteTutor);

module.exports = router;