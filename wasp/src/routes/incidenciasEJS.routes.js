const express = require('express');
const router = express.Router();

const Incidencia = require('../models/Incidencias');
const Departamento = require('../models/Departamentos');
const Tecnico = require('../models/Tecnicos');

// Llistar incidencias (GET) 
router.get('/list', async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({ include: Departamento });
        res.render('incidencias', { incidencias });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias');
    }
});

router.get('/asignar', async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({ include: Departamento, Tecnico});
        const tecnicos = await Tecnico.findAll(); // Obtener todos los técnicos
        res.render('incidencias/moderador/asignar', { incidencias, tecnicos });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias o técnicos');
    }
});

router.post('asignar/:id/update', async (req, res) => {
    try {
        const { id, nombret, descripcio, prioritat, departament, dataincidencia} = req.body;
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        incidencia.id = id;
        incidencia.nombret = nombret;
        incidencia.descripcio = descripcio;
        incidencia.prioridat = prioritat;
        incidencia.departament = departament;
        incidencia.dataincidencia = dataincidencia;
        await incidencia.save();

        res.redirect('incidencias/moderador/asignar');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidencia');
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

        res.render('incidencias/usuari/listone', { incidencia });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar la incidència');
    }
});

// Form per crear una incidencia (GET)
router.get('/new', async (req, res) => {
    try {
        const departamentos = await Departamento.findAll(); 
        res.render('incidencias/usuari/crear', { departamentos });
    }
    catch (error) {
        res.status(500).send('Error al carregar el formulari' + error.message);
    }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
    try {
        const { descripcio, prioritat, departament, dataincidencia } = req.body;
        inc = await Incidencia.create({ descripcio, prioritat, departament, dataincidencia });
        res.render('incidencias/usuari/ticket'); 
    } catch (error) { 
        console.error(error);
        res.status(500).send('Error al crear la incidencia'+ error.message); 
    }
});

// Form per editar una incidencia (GET)
router.get('/list/:id/editar', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');

        const departamentos = await Departamento.findAll();
        res.render('incidencias/editar', { incidencia, departamentos });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició' + error.message);
    }

});

// Actualitzar incidencia (POST)
router.post('/:id/update', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament, dataincidencia} = req.body;
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        incidencia.id = id;
        incidencia.descripcio = descripcio;
        incidencia.prioridat = prioritat;
        incidencia.departament = departament;
        incidencia.dataincidencia = dataincidencia;
        await incidencia.save();

        res.redirect('/incidencias');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidencia');
    }
});

// Actualitzar totes les incidencias (POST)
router.post('/updateAll', async (req, res) => {
    try {
        const updates = Object.keys(req.body).reduce((acc, key) => {
            const [field, id] = key.split('_');
            if (!acc[id]) acc[id] = {};
            acc[id][field] = req.body[key];
            return acc;
        }, {});

        for (const id in updates) {
            const incidencia = await Incidencia.findByPk(id);
            if (incidencia) {
                incidencia.prioritat = updates[id].prioridad || incidencia.prioritat;
                incidencia.idt = updates[id].tecnico || incidencia.idt;
                await incidencia.save();
            }
        }

        res.redirect('/moderador');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar las incidencias');
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