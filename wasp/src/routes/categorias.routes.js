const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categorias.controllers');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

router.get('/list', categoriaController.list);

router.get('/crear', (req, res) => {
    res.render('categorias/crear');
});


module.exports = router;
