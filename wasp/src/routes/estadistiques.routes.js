const express = require('express');
const router = express.Router();

const estadisticasController = require('../controllers/estadistiques.controllers');

// Ruta para estadísticas por rol (usuarios)
router.get('/estadistiques-rols', estadisticasController.estadisticasRol);

// Ruta para estadísticas por hora
router.get('/estadistiques-hores', estadisticasController.estadisticasHora);

module.exports = router;
