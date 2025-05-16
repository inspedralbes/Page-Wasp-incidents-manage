const Tecnico = require('../models/Tecnicos');

exports.list = async (req, res) => {
    try {
        const tecnicos = await Tecnico.findAll();
        res.render('tecnicos/list_all', { tecnicos });
    } catch (error) {
        res.status(500).send('Error al recuperar categories: ' + error.message);
    }
};

exports.formCrear = async (req, res) => {
    try {
        res.render('tecnicos/crear');
    } catch (error) {
        res.status(500).send('Error al carregar el formulari' + error.message);
    }
};

exports.crear = async (req, res) => {
    try {
        const { nombre, contrasena } = req.body;
        await Tecnico.create({ nombre, contrasena });

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al crear l'incidència" + error.message);
    }
};

exports.formEditar = async (req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id);
        if (!tecnico) return res.status(404).send('Técnico no encontrado');
        res.render('tecnicos/editar', { tecnico });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición: ' + error.message);
    }
};

exports.actualizar = async (req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id);
        if (!tecnico) return res.status(404).send('Técnico no encontrado');

        const { nombre, contrasena } = req.body;
        if (nombre !== undefined) tecnico.nombre = nombre;
        if (contrasena !== undefined) tecnico.contrasena = contrasena;

        await tecnico.save();

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send('Error al actualizar el técnico: ' + error.message);
    }
};

exports.eliminar = async (req, res) => {
    try {
        const tecnico = await Tecnico.findByPk(req.params.id);
        if (!tecnico) return res.status(404).send('Incidència no trobada');
        await tecnico.destroy();
        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al eliminar l'incidència");
    }
};
