const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos.controllers');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

router.get('/list', departamentoController.list);

router.get('/crear', (req, res) => {
    res.render('departamentos/crear');
});

module.exports = router;
