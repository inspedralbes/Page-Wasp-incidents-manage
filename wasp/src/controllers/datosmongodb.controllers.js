const Stat = require('../models/Stats');
const Mensaje = require('../models/Mensajes');

exports.estadisticasRol = async (req, res) => {
    try {
        const datos = await Stat.aggregate([
            {
                $group: {
                    _id: "$usuario",
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estadísticas por rol' });
    }
};

exports.estadisticasHora = async (req, res) => {
    try {
        const datos = await Stat.aggregate([
            {
                $group: {
                    _id: { $hour: "$timestamp" },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estadísticas por hora' });
    }
};

exports.verChat = async (req, res) => {
    try {
        const mensajes = await Mensaje.find().sort({ timestamp: 1 });
        res.render('tecnic', { tecnico: req.session.usuario, incidencias: [], mensajes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno');
    }
};

exports.enviarMensaje = async (req, res) => {
    const nuevo = new Mensaje({
        autor: req.session.usuario.nombre,
        mensaje: req.body.mensaje
    });
    await nuevo.save();
    res.redirect('/chat');
};