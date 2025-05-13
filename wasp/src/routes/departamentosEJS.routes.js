const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('../middleware/authMiddleware');

router.get('/list', departamentoController.list);

module.exports = router;
