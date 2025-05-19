const Departamento = require('../models/Departamentos');

exports.list = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('otros/departamentos/list_all', { departamentos });
    } catch (error) {
        res.status(500).send('Error al recuperar departaments: ' + error.message);
    }
};

exports.formCrear = async (req, res) => {
    try {
        res.render('/otros/departamentos/crear');
    } catch (error) {
        res.status(500).send('Error al carregar el formulari' + error.message);
    }
};

exports.crear = async (req, res) => {
    try {
        const { nombre, ubicacio } = req.body;
        await Departamento.create({ nombre, ubicacio });

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al crear l'incidència" + error.message);
    }
};

exports.formEditar = async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) return res.status(404).send('Departament no trobat');
        res.render('otros/departamentos/editar', { departamento });
    } catch (error) {
        res.status(500).send("Error al carregar el formulari d'edició: " + error.message);
    }
};

exports.actualizar = async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) return res.status(404).send('Departament no trobat');

        const { nombre, ubicacio } = req.body;
        if (nombre !== undefined) departamento.nombre = nombre;
        if (ubicacio !== undefined) departamento.ubicacio = ubicacio;

        await departamento.save();

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send('Error al actualitzar el departament: ' + error.message);
    }
};

exports.eliminar = async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) return res.status(404).send('Incidència no trobada');
        await departamento.destroy();
        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al eliminar l'incidència");
    }
};


