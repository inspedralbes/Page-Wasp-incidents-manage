const express = require('express');
const router = express.Router();

const incidenciaController = require('../controllers/incidencias');

// Listar incidencias
router.get('/list', incidenciaController.listarTodas);

// Listar una específica
router.get('/list/:id', incidenciaController.listarUna);

// Incidencias por técnico
router.get('/list/tecnic/:id', incidenciaController.listarPorTecnico);

// Crear incidencia
router.get('/new', incidenciaController.formCrear);
router.post('/create', incidenciaController.crear);

// Asignar incidencia
router.get('/asignar', incidenciaController.formAsignar);
router.post('/asignar/:id/update', incidenciaController.asignar);

// Editar incidencia
router.get('/list/:id/editar', incidenciaController.formEditar);
router.post('/:id/update', incidenciaController.actualizar);

// Actualizar todas
router.post('/updateAll', incidenciaController.actualizarTodas);

// Eliminar incidencia
router.get('/:id/delete', incidenciaController.eliminar);

module.exports = router;
