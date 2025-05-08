const express = require('express');
const router = express.Router();

const Incidencia = require('../models/Incidencias');
const Departamento = require('../models/Departamentos');
const Tecnico = require('../models/Tecnicos');
const Actuacion = require('../models/Actuaciones');

// Llistar incidencias (GET) 
router.get('/list', async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({ include: [Departamento, Tecnico] });
        res.render('incidencias/list_all', { incidencias });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias');
    }
});

router.get('/asignar', async (req, res) => {
    try {
        const incidencias_w = await Incidencia.findAll({ include: [Departamento, Tecnico] });
        const incidencias = incidencias_w.filter(inc => !inc.idt || !inc.prioritat); 
        const tecnicos = await Tecnico.findAll();

        res.render('incidencias/asignar', { incidencias, tecnicos });
    }
    catch (error) {
        res.status(500).send('Error al recuperar incidencias o técnicos' + error.message);
    }
});


router.post('/asignar/:id/update', async (req, res) => {
    try {
        const { descripcio, prioritat, dataincidencia, idd, idt } = req.body;

        // Buscar la incidencia por ID
        const incidencia = await Incidencias.findByPk(req.params.id);

        if (!incidencia) {
            return res.status(404).send('Incidencia no trobada'); 
        }

        // Actualizar los campos de la incidencia
        incidencia.descripcio = descripcio;
        incidencia.prioritat = prioritat;
        incidencia.dataincidencia = dataincidencia;
        incidencia.idd = idd; // Actualizar ID del departamento
        incidencia.idt = idt; // Actualizar ID del técnico

        await incidencia.save();

        res.redirect('/incidencias/asignar');
    } catch (error) {
        console.error('Error al actualizar la incidencia:', error); 
        res.status(500).send('Error al actualizar la incidencia'); 
    }
});


// Llistar una incidencia específica (GET)
router.get('/list/:id', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id, { include: Departamento });

        if (!incidencia) {
            return res.status(404).send('Incidència no trobada');
        }

        res.render('incidencias/list_one', { incidencia });
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
        res.status(500).send('Error al carregar el formulari' + error.message);
    }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
    try {
        const { descripcio, prioritat, departament, dataincidencia } = req.body;
        console.log('Departamento recibido:', departament); // Verifica que recibes el valor correcto
        inc = await Incidencia.create({
            descripcio,
            prioritat,
            departament,  // Esto debe coincidir con el campo que necesitas
            dataincidencia
        });
        res.render('incidencias/ticket'); 
    } catch (error) { 
        console.error(error);
        res.status(500).send('Error al crear la incidencia'+ error.message); 
    }
});

// Incidencias del tecnic
router.get('/list/tecnic/:id', async (req, res) => {
    const idt = req.params.id;
  
    try {
        const incidencias = await Incidencia.findAll({ where:{idt: idt}, include: [Departamento, Tecnico] });

        const tecnico = await Tecnico.findByPk(idt);
        const tecnicoNombre = tecnico ? tecnico.nombre : 'Sense tècnic';

        res.render('incidencias/list_tecnic', { incidencias, tecnicoNombre});
    } catch (error) {
      res.status(500).send('Error al carregar el formulari d’edició: ' + error.message);
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