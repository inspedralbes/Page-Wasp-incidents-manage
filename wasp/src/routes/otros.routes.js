const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos.controllers');
const categoriaController = require('../controllers/categorias.controllers');

// Departamentos
router.get('/departamentos/list', departamentoController.list);
router.get('/departamentos/crear', (req, res) => {
    res.render('departamentos/crear');
});

// Categorias
router.get('/categorias/list', categoriaController.list);
router.get('/categorias/crear', (req, res) => {
    res.render('categorias/crear');
});

module.exports = router;