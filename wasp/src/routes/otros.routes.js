const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos.controllers');
const tecnicoController = require('../controllers/tecnicos.controllers');
const categoriaController = require('../controllers/categorias.controllers');

const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

// Departamentos
router.get('/departamentos/list', departamentoController.list);

router.get('/departamentos/new', departamentoController.formCrear);
router.post('/departamentos/create', departamentoController.crear);

router.get('/departamentos/:id/editar', departamentoController.formEditar);
router.post('/departamentos/:id/update', departamentoController.actualizar);

router.get('/departamentos/:id/delete', departamentoController.eliminar);


// Tecicos
router.get('/tecnicos/list', isAuthenticated, isModerador, tecnicoController.list);

router.get('/tecnicos/new', isAuthenticated, isModerador, tecnicoController.formCrear);
router.post('/tecnicos/create', isAuthenticated, isModerador, tecnicoController.crear);

router.get('/tecnicos/:id/editar', isAuthenticated, isModerador, tecnicoController.formEditar);
router.post('/tecnicos/:id/update', isAuthenticated, isModerador, tecnicoController.actualizar);

router.get('/tecnicos/:id/delete', isAuthenticated, isModerador, tecnicoController.eliminar);


// Categorias
router.get('/categorias/list', isAuthenticated, isModerador, categoriaController.list);

router.get('/categorias/new', isAuthenticated, isModerador, categoriaController.formCrear);
router.post('/categorias/create', isAuthenticated, isModerador, categoriaController.crear);

router.get('/categorias/:id/editar', isAuthenticated, isModerador, categoriaController.formEditar);
router.post('/categorias/:id/update', isAuthenticated, isModerador, categoriaController.actualizar);

router.get('/categorias/:id/delete', isAuthenticated, isModerador, categoriaController.eliminar);

module.exports = router;
