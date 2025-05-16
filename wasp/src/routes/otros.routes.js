const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos.controllers');
const tecnicoController = require('../controllers/tecnicos.controllers');
const categoriaController = require('../controllers/categorias.controllers');

// Departamentos
router.get('/departamentos/list', departamentoController.list);

router.get('/departamentos/new', departamentoController.formCrear);
router.post('/departamentos/create', departamentoController.crear);

router.post('/departamentos/:id/update', departamentoController.update);

// Tecicos
router.get('/tecnicos/list', tecnicoController.list);

router.get('/tecnicos/new', tecnicoController.formCrear);
router.post('/tecnicos/create', tecnicoController.crear);

router.post('/tecnicos/:id/update', tecnicoController.update);

// Categorias
router.get('/categorias/list', categoriaController.list);

router.get('/categorias/new', categoriaController.formCrear);
router.post('/categorias/create', categoriaController.crear);

router.post('/categorias/:id/update', categoriaController.update);

module.exports = router;
