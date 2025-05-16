const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos.controllers');
const tecnicoController = require('../controllers/tecnicos.controllers');
const categoriaController = require('../controllers/categorias.controllers');

// Departamentos
router.get('/departamentos/list', departamentoController.list);

router.get('/departamentos/new', departamentoController.formCrear);
router.post('/departamentos/create', departamentoController.crear);

router.get('/departamentos/:id/editar', departamentoController.formEditar);
router.post('/departamentos/:id/update', departamentoController.actualizar);

router.get('/departamentos/:id/delete', departamentoController.eliminar);


// Tecicos
router.get('/tecnicos/list', tecnicoController.list);

router.get('/tecnicos/new', tecnicoController.formCrear);
router.post('/tecnicos/create', tecnicoController.crear);

router.get('/tecnicos/:id/editar', tecnicoController.formEditar);
router.post('/tecnicos/:id/update', tecnicoController.actualizar);

router.get('/tecnicos/:id/delete', tecnicoController.eliminar);


// Categorias
router.get('/categorias/list', categoriaController.list);

router.get('/categorias/new', categoriaController.formCrear);
router.post('/categorias/create', categoriaController.crear);

router.get('/categorias/:id/editar', categoriaController.formEditar);
router.post('/categorias/:id/update', categoriaController.actualizar);

router.get('/categorias/:id/delete', categoriaController.eliminar);

module.exports = router;
