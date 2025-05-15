const Departamento = require('../models/Departamentos');

exports.list = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.render('departamentos/list_all', { departamentos });
    } catch (error) {
        res.status(500).send('Error al recuperar departaments: ' + error.message);
    }
};

exports.crear = async (req, res) => {
    try {
        const { nombre, ubicacio } = req.body;
        const departamento = await Departamento.create({ nombre, ubicacio });

        res.render('moderador', { departamento });
    } catch (error) {
        res.status(500).send("Error al crear el departament" + error.message);
    }
};