const Categoria = require('../models/Categorias');

exports.list = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.render('categorias/list_all', { categorias });
    } catch (error) {
        res.status(500).send('Error al recuperar categorias: ' + error.message);
    }
};