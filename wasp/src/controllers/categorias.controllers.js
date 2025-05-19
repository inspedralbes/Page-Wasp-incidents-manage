const Categoria = require('../models/Categorias');

exports.list = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.render('otros/categorias/list_all', { categorias });
    } catch (error) {
        res.status(500).send('Error al recuperar categories: ' + error.message);
    }
};

exports.formCrear = async (req, res) => {
    try {
        res.render('otros/categorias/crear');
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

exports.formEditar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) return res.status(404).send('Categoria no trobada');
        res.render('otros/categorias/editar', { categoria });
    } catch (error) {
        res.status(500).send("Error al carregar el formulari d'edició: " + error.message);
    }
};

exports.actualizar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) return res.status(404).send('Categoria no trobada');

        const { nombre } = req.body;
        if (nombre !== undefined) {
            categoria.nombre = nombre;
            await categoria.save();
        }

        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send('Error al actualitzar la categoria: ' + error.message);
    }
};

exports.eliminar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) return res.status(404).send('Incidència no trobada');
        await categoria.destroy();
        res.redirect('/moderador');
    } catch (error) {
        res.status(500).send("Error al eliminar l'incidència");
    }
};

