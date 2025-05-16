const Departamento = require('../models/Departamentos');

exports.list = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('departamentos/list_all', { departamentos });
    } catch (error) {
        res.status(500).send('Error al recuperar departaments: ' + error.message);
    }
};

exports.formCrear = async (req, res) => {
    try {
        res.render('departamentos/crear');
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

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const departamento = await Departamento.findByPk(id);

        if (!departamento) {
            return res.status(404).send("Departamento no encontrado.");
        }

        const { nombre, ubicacio } = req.body;

        if (nombre !== undefined && ubicacio !== undefined) {
            departamento.nombre = nombre;
            departamento.ubicacio = ubicacio;
            await departamento.save();
        }

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al actualizar el departamento: " + error.message);
    }
};

