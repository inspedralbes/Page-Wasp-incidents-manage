const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categorias.controllers');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

router.get('/list', categoriaController.list);

module.exports = router;
