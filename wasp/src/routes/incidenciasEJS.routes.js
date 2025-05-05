const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencias');
const Departamento = require('../models/Departamentos');

// Llistar incidencias (GET) 
router.get('/list', async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({ include: Departamento });
        res.render('incidencias/listall', { incidencias });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias');
    }
});

// Llistar una incidencia específica (GET)
router.get('/list/:id', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id, {
            include: Departamento, // Incluye el departamento relacionado si es necesario
        });

        if (!incidencia) {
            return res.status(404).send('Incidència no trobada');
        }

        res.render('incidencias/listone', { incidencia });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar la incidència');
    }
});

// Form per crear una incidencia (GET)
router.get('/new', async (req, res) => {
    try {
        const departamentos = await Departamento.findAll(); 
        res.render('incidencias/crear', { departamentos });
    }
    catch (error) {
        res.status(500).send('Error al carregar el formulari');
    }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
    try {
        const { name, brand, cc, country, departamentoId } = req.body;
        await Incidencia.create({ name, brand, cc, country, departamentoId });
        res.redirect('/incidencias/listall'); // Torna al llistat 
    }
    catch (error) { 
        res.status(500).send('Error al crear la incidencia'); 
    }
});

// Form per editar una incidencia (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');

        const departamentos = await Departamento.findAll();
        res.render('incidencias/asignar', { incidencia, departamentos });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició');
    }

});

// Actualitzar incidencia (POST)

router.post('/:id/update', async (req, res) => {
    try {
        const { name, brand, cc, country, departamentoId } = req.body;
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        incidencia.name = name;
        incidencia.brand = brand;
        incidencia.cc = cc;
        incidencia.country = country;
        incidencia.departamentoId = departamentoId;
        await incidencia.save();

        res.redirect('/incidencias');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidencia');
    }

});

// Eliminar incidencia (GET, per simplicitat)

router.get('/:id/delete', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        await incidencia.destroy(); 
        res.redirect('/incidencias');
    }
    catch (error) {
        res.status(500).send('Error al eliminar la incidencia');
    }
});

module.exports = router;