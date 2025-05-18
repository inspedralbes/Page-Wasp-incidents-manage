const express = require('express');
const router = express.Router();

const datosmongodbController = require('../controllers/datosmongodb.controllers');

// Ruta para estadísticas por rol (usuarios)
router.get('/estadistiques-rols', datosmongodbController.estadisticasRol);

// Ruta para estadísticas por hora
router.get('/estadistiques-hores', datosmongodbController.estadisticasHora);

// Mostrar chat de los tecnicos y escribir en el chat
router.get('/chat', datosmongodbController.verChat);
router.post('/chat', datosmongodbController.enviarMensaje);

module.exports = router;
