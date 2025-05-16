const express = require('express');
const router = express.Router();

const controller = require('../controllers/estadistiques.controllers');

router.get('/estadistiques', controller.listarEstadistiques);

module.exports = router;
