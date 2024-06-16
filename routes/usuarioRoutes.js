const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
// Otros endpoints como router.get('/:id'), router.post('/'), router.put('/:id'), router.delete('/:id') también se definen aquí

module.exports = router;
