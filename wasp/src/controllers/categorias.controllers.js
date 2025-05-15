const Categoria = require('../models/Categorias');

exports.list = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.render('categorias/list_all', { categorias });
    } catch (error) {
        res.status(500).send('Error al recuperar categories: ' + error.message);
    }
};

exports.crear = async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoria = await Categoria.create({ nombre });

        res.render('moderador', { categoria });
    } catch (error) {
        res.status(500).send("Error al crear el categoria" + error.message);
    }
};