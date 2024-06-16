const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

router.get('/', tutorController.getAllTutores);
// Otros endpoints como router.get('/:id'), router.post('/'), router.put('/:id'), router.delete('/:id') también se definen aquí

module.exports = router;