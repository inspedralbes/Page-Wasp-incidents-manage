const express = require('express');
const router = express.Router();

const Departamento = require('../models/Departamentos');

// Llistar incidencias (GET) 
router.get('/list', async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('departamentos/listall', {departamentos});
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias');
    }
});

module.exports = router;