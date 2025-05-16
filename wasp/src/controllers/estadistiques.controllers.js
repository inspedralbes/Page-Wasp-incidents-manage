const Visita = require('../models/Stats');

exports.listarEstadistiques = async (req, res) => {
    try {
        const visitasPorRol = await Visita.aggregate([
            { $group: { _id: "$usuario.rol", total: { $sum: 1 } } }
        ]);

        res.render('estadistiques', {
            visitasPorRol,
            visitesJson: JSON.stringify(visitasPorRol)
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error carregant les estadístiques');
    }
};