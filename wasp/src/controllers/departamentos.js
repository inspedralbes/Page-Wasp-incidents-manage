const Departamento = require('../models/Departamentos');

exports.list = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('departamentos/list_all', { departamentos });
    } catch (error) {
        res.status(500).send('Error al recuperar departamentos: ' + error.message);
    }
};
