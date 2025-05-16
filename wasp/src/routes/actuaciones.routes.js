const express = require('express');
const router = express.Router();

const actuacionController = require('../controllers/actuaciones.controllers');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

// Lista las actuaciones publicas de una incidencia
router.get('/list/incidencias/public/:id', isAuthenticated, isUsuari, actuacionController.listarPublicas);

// Lista las actuaciones de una incidencia
router.get('/list/incidencias/:id', isAuthenticated, isTecnic, actuacionController.listarPorIncidencia);

// Crear una actuacion
router.get('/new/incidencias/:id', isAuthenticated, isTecnic, actuacionController.formCrear);
router.post('/create', isAuthenticated, isTecnic, actuacionController.crear);

module.exports = router;
