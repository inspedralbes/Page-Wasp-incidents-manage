const express = require('express');
const router = express.Router();
const Incidencias = require('../models/Incidencias');

// CREATE
router.post('/', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament, dataincidencia } = req.body;
        const incidencia = await Incidencias.create({ id, descripcio, prioritat, departament, dataincidencia });
        res.status(201).json(incidencia);
    } catch (error) {
        res.status(500).json({ error: 'No s’ha pogut crear la incidència' });
    }
});

// READ: totes
router.get('/', async (req, res) => {
    try {
        const incidencias = await Incidencias.findAll();
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ error: 'Error al recuperar les incidències' });
    }
});

// READ: una sola
router.get('/:id', async (req, res) => {
    try {
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).json({ error: 'Incidència no trobada' });
        res.json(incidencia);
    } catch (error) {
        res.status(500).json({ error: 'Error al recuperar la incidència' });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament, dataincidencia } = req.body;
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).json({ error: 'Incidència no trobada' });
        incidencia.id = id;
        incidencia.descripcio = descripcio;
        incidencia.prioritat = prioritat;
        incidencia.departament = departament;
        incidencia.dataincidencia = dataincidencia;
        await incidencia.save();
        res.json(incidencia);
    } catch (error) {
        res.status(500).json({ error: 'Error al fer update de la incidència' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const incidencia = await Incidencias.findByPk(req.params.id);
        if (!incidencia) return res.status(404).json({ error: 'Incidència no trobada' });
        await incidencia.destroy();
        res.json({ message: 'Incidència eliminada correctament' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la incidència' });
    }
});

module.exports = router;
