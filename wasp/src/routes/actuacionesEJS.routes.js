const express = require('express');
const router = express.Router();

const actuacionController = require('../controllers/actuaciones');

// Lista todas las actuaciones
router.get('/list', actuacionController.listarTodas);

// Lista las actuaciones de un tecnico
router.get('/list/incidencias/:id', actuacionController.listarPorIncidencia);

// Crear una actuacion
router.get('/new', actuacionController.formCrear);
router.post('/create', actuacionController.crear);

module.exports = router;
