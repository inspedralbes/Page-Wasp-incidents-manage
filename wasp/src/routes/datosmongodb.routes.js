const express = require('express');
const router = express.Router();

const datosmongodbController = require('../controllers/datosmongodb.controllers');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

// Ruta para estadísticas por rol 
router.get('/estadistiques-rols', datosmongodbController.estadisticasRol);

// Ruta para estadísticas por hora
router.get('/estadistiques-hores', datosmongodbController.estadisticasHora);

// Ruta para estadística por día
router.get('/estadistiques-dias', datosmongodbController.estadisticasPorDia);

// Mostrar chat de los tecnicos y escribir en el chat
router.get('/chat', isAuthenticated, datosmongodbController.verChat);
router.post('/chat', isAuthenticated, datosmongodbController.enviarMensaje);

module.exports = router;
