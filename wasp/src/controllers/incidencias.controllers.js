const Incidencia = require('../models/Incidencias');
const Departamento = require('../models/Departamentos');
const Tecnico = require('../models/Tecnicos');
const Categoria = require('../models/Categorias');

exports.listarTodas = async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({ include: [Departamento, Tecnico, Categoria] });
        res.render('incidencias/list_all', { incidencias });
    } catch (error) {
        res.status(500).send('Error al recuperar incidencias');
    }
};

exports.listarUna = async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id, { include: [Departamento, Categoria] });
        if (!incidencia) return res.status(404).send('Incidència no trobada');
        res.render('incidencias/list_one', { incidencia });
    } catch (error) {
        res.status(500).send('Error al recuperar la incidència');
    }
};

exports.listarPorTecnico = async (req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id, { include: Incidencia, Categoria });

        if (!tecnico) {
            return res.status(404).send('Tècnic no trobat');
        }

        res.render('incidencias/list_person', {
            tecnico,
            incidencias: tecnico.Incidencia
        });

    } catch (error) {
        console.error('Error al cargar incidencias del tècnic: ' + error);
        res.status(500).send('Error al cargar incidencias del tècnic: ' + error);
    }
};

exports.formCrear = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        const categorias = await Categoria.findAll();
        res.render('incidencias/crear', { departamentos, categorias });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari' + error.message);
    }
};

exports.crear = async (req, res) => {
    try {
        const { descripcio, prioritat, dataincidencia, idd, idc } = req.body;
        const incidencia = await Incidencia.create({ descripcio, prioritat, dataincidencia, idd, idc });

        res.render('incidencias/ticket', { incidencia });
    } catch (error) {
        res.status(500).send('Error al crear la incidencia' + error.message);
    }
};

exports.formAsignar = async (req, res) => {
    try {
        const incidencias_w = await Incidencia.findAll({ include: [Departamento, Tecnico] });
        const incidencias = incidencias_w.filter(inc => !inc.idt || !inc.prioritat);
        const tecnicos = await Tecnico.findAll();
        const categorias = await Categoria.findAll();
        res.render('incidencias/asignar', { incidencias, tecnicos });
    } catch (error) {
        res.status(500).send('Error al recuperar incidencias o técnicos' + error.message);
    }
};

exports.asignar = async (req, res) => {
    try {
        const { descripcio, prioritat, dataincidencia, idd, idt } = req.body;
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');

        incidencia.descripcio = descripcio;
        incidencia.prioritat = prioritat;
        incidencia.dataincidencia = dataincidencia;
        incidencia.idd = idd;
        incidencia.idt = idt;
        await incidencia.save();

        res.redirect('/incidencias/asignar');
    } catch (error) {
        res.status(500).send('Error al actualizar la incidencia');
    }
};

exports.desasignarTecnico = async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');

        incidencia.idt = null; 
        await incidencia.save();

        res.redirect('/moderador'); 
    } catch (error) {
        res.status(500).send('Error al desasignar el técnico');
    }
};

exports.formEditar = async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        const departamentos = await Departamento.findAll();
        const categorias = await Categoria.findAll();
        res.render('incidencias/editar', { incidencia, departamentos, categorias });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició' + error.message);
    }
};

exports.actualizar = async (req, res) => {
    try {
        const { id, descripcio, prioritat, idd, dataincidencia, idc } = req.body;
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');

        incidencia.id = id;
        incidencia.descripcio = descripcio;
        incidencia.prioritat = prioritat;
        incidencia.idd = idd;
        incidencia.dataincidencia = dataincidencia;
        incidencia.idc = idc;
        await incidencia.save();

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidencia');
    }
};

exports.actualizarTodas = async (req, res) => {
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
                incidencia.idc = updates[id].categoria || incidencia.idc;
                await incidencia.save();
            }
        }

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send('Error al actualizar las incidencias');
    }
};

exports.eliminar = async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        await incidencia.destroy();
        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send('Error al eliminar la incidencia');
    }
};