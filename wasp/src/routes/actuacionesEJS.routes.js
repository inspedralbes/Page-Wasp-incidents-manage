const express = require('express');
const router = express.Router();
const actuacionController = require('../controllers/actuaciones');

// Lista todas las actuaciones
router.get('/list', actuacionController.listAll);

// Lista las actuaciones de una incidencia concreta
router.get('/list/:id', actuacionController.listByIncidencia);

// Formulario de creación
router.get('/new', actuacionController.newForm);

// Crear una nueva actuación
router.post('/create', actuacionController.create);

module.exports = router;
