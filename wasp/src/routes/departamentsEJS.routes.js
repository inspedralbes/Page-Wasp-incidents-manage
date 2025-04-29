const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');

// Llistar departaments
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('departamentos/list', { departamentos });
    } catch (error) {
        res.status(500).send('Error al recuperar departaments');
    }
});

// Form nou departament
router.get('/new', (req, res) => {
    res.render('departamentos/new');
});

// Crear departament
router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;
        await Departamento.create({ name });
        res.redirect('/departamentos');
    } catch (error) {
        res.status(500).send('Error al crear departament');
    }
});

// Form edició departament
router.get('/:id/edit', async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) return res.status(404).send('Departament no trobat');
        res.render('departamentos/edit', { departamento });
    } catch (error) {
        res.status(500).send('Error al carregar formulari d’edició');
    }
});

// Actualitzar departament
router.post('/:id/update', async (req, res) => {
    try {
        const { name } = req.body;
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) return res.status(404).send('Departament no trobat');
        departamento.name = name;
        await departamento.save();
        res.redirect('/departamentos');
    } catch (error) {
        res.status(500).send('Error al actualitzar el departament');
    }
});

// Eliminar departament
router.get('/:id/delete', async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) return res.status(404).send('Departament no trobat');
        await departamento.destroy();
        res.redirect('/departamentos');
    } catch (error) {
        res.status(500).send('Error al eliminar el departament');
    }
});

module.exports = router;