const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentos');

router.get('/list', departamentoController.list);

module.exports = router;
