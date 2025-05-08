const express = require('express');
const router = express.Router();

const Incidencia = require('../models/Incidencias');
const Departamento = require('../models/Departamentos');
const Tecnico = require('../models/Tecnicos');
const Actuacion = require('../models/Actuaciones');

// Llistar incidencias (GET) 
router.get('/list', async (req, res) => {
    try {
        const actuaciones = await Actuacion.findAll();
        res.render('actuaciones/list_all', {actuaciones});
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias' + error.message);
    }
});

// Llistar totes les actuacions d'una incidència (GET)
router.get('/list/:id', async (req, res) => {
    try {
        const actuaciones = await Actuacion.findAll({
            where: { idi : req.params.id }, include: [Tecnico]
        });

        if (actuaciones.length === 0) {
            return res.status(404).send('No s’han trobat actuacions per a aquesta incidència');
        }

        res.render('actuaciones/list_concret', { actuaciones });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar les actuacions' + error.message);
    }
});


module.exports = router;

