const express = require('express');
const router = express.Router();
const Incidencias = require('../models/Incidencias');

// Llistar incidencias (GET) 
router.get('/', async (req, res) => {
    try {
        const incidencias = await Incidencias.findAll();
        res.render('incidencias/gets', { incidencias });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidències');
    }
});

// Llistar Incidencia per id (GET)
router.get('/:id', async (req, res) => {
    try {
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidència no trobada');
        res.render('incidencias/get', { incidencia });
    }
    catch (error) {
        res.status(500).send('Error al recuperar la incidència');
    }
});

// Form per crear una incidencia (GET)
router.get('/new', async (req, res) => {
    try {
        res.render('incidencias/add');
    }
    catch (error) {
        res.status(500).send('Error al carregar el formulari');
    }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament, dataincidencia } = req.body;
        await Incidencias.create({ id, descripcio, prioritat, departament, dataincidencia });
        res.redirect('/incidencias'); // Torna al llistat 
    }
    catch (error) { res.status(500).send('Error al crear la incidencia'); }
});

// Form per editar una incidencia (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidència no trobada');

        res.render('incidencias/edit', { incidencia });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició');
    }

});

// Actualitzar incidencia (POST)
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

// Eliminar incidencia (GET, per simplicitat)
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