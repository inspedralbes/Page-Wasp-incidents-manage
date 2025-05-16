const Categoria = require('../models/Tecnicos');

exports.list = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
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
        const { nombre } = req.body;
        await Categoria.create({ nombre });

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al crear l'incidència" + error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).send("Categoría no encontrada.");
        }

        const nuevoNombre = req.body.nombre;
        if (nuevoNombre !== undefined) {
            categoria.nombre = nuevoNombre;
            await categoria.save();
        }

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al actualizar la categoría: " + error.message);
    }
};

