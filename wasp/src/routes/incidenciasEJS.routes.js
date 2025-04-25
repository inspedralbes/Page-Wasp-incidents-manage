const express = require('express');
const router = express.Router();
const Incidencias = require('../models/Incidencias');

// Llistar motos (GET) 
router.get('/', async (req, res) => {
    try {
        const incidencias = await Incidencias.findAll();
        res.render('incidencias/list', { incidencias });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidències');
    }
});

// Form per crear una moto (GET)
router.get('/new', async (req, res) => {
    try {
        res.render('incidencias/new');
    }
    catch (error) {
        res.status(500).send('Error al carregar el formulari');
    }
});

// Crear moto (POST)
router.post('/create', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament, dataincidencia } = req.body;
        await Incidencias.create({ id, descripcio, prioritat, departament, dataincidencia });
        res.redirect('/incidencias'); // Torna al llistat 
    }
    catch (error) { res.status(500).send('Error al crear la incidencia'); }
});

// Form per editar una moto (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidència no trobada');

        res.render('incidencias/edit', { moto });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició');
    }

});

// Actualitzar moto (POST)

router.post('/:id/update', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament, dataincidencia } = req.body;
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidència no trobada');
        incidencia.id = id;
        incidencia.descripcio = descripcio;
        incidencia.prioritat = prioritat;
        incidencia.departament = departament;
        incidencia.dataincidencia = dataincidencia;
        await incidencia.save();

        res.redirect('/incidencias');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidencias');
    }

});

// Eliminar moto (GET, per simplicitat)

router.get('/:id/delete', async (req, res) => {
    try {
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidència no trobada');
        await incidencia.destroy(); res.redirect('/incidencias');
    }
    catch (error) {
        res.status(500).send('Error al eliminar la incidencia');
    }
});

module.exports = router;