const express = require('express');
const router = express.Router();

const Incidencia = require('../models/Incidencias');
const Departamento = require('../models/Departamentos');
const Tecnico = require('../models/Tecnicos');
const Actuacion = require('../models/Actuaciones');

// Llistar incidencias (GET) 
router.get('/list', async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('departamentos/list_all', {departamentos});
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias' + error.message);
    }
});

module.exports = router;