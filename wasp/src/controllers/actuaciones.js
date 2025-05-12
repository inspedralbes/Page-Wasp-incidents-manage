const Actuacion = require('../models/Actuaciones');
const Tecnico = require('../models/Tecnicos');
const Incidencia = require('../models/Incidencias');

exports.listAll = async (req, res) => {
    try {
        const actuaciones = await Actuacion.findAll();
        res.render('actuaciones/list_all', { actuaciones });
    } catch (error) {
        res.status(500).send('Error al recuperar actuaciones: ' + error.message);
    }
};

exports.listByIncidencia = async (req, res) => {
    try {
        const actuaciones = await Actuacion.findAll({
            where: { idi: req.params.id },
            include: [Tecnico, Incidencia]
        });

        if (actuaciones.length === 0) {
            return res.status(404).send('No s’han trobat actuacions per a aquesta incidència');
        }

        res.render('actuaciones/list_concret', { actuaciones });
    } catch (error) {
        res.status(500).send('Error al recuperar les actuacions: ' + error.message);
    }
};

exports.newForm = async (req, res) => {
    try {
        const tecnicos = await Tecnico.findAll();
        const incidencias = await Incidencia.findAll();
        res.render('actuaciones/crear', { tecnicos, incidencias });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari: ' + error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const { descripcio, hores, resolt, idt, idi } = req.body;
        await Actuacion.create({ descripcio, hores, resolt, idt, idi });
        res.redirect('/actuaciones/list/' + idi);
    } catch (error) {
        res.status(500).send('Error al crear la actuació: ' + error.message);
    }
};
