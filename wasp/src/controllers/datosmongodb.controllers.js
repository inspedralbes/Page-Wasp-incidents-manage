const Stat = require('../models/Stats');

const Mensaje = require('../models/Mensajes');
const Usuario = require('../models/Usuarios');
const Tecnico = require('../models/Tecnicos');
const Moderador = require('../models/Moderadores');


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
        res.status(500).json({ error: 'Error al obtenir estadístiques per rol' });
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
        res.status(500).json({ error: 'Error al obtenir estadístiques per hora' });
    }
};

exports.estadisticasPorDia = async (req, res) => {
    try {
        const datos = await Stat.aggregate([
            {
                $match: { url: '/create' }
            },
            {
                $group: {
                    _id: {
                        año: { $year: "$timestamp" },
                        mes: { $month: "$timestamp" },
                        dia: { $dayOfMonth: "$timestamp" }
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.año": 1, "_id.mes": 1, "_id.dia": 1 }
            }
        ]);
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtenir estadístiques per dia' });
    }
};

exports.verChat = async (req, res) => {
    try {
        const mensajes = await Mensaje.find().sort({ timestamp: 1 });

        const modelos = {
            usuari: Usuario,
            tecnic: Tecnico,
            moderador: Moderador
        };

        const modelo = modelos[req.session.rol];
        if (!modelo) return res.status(401).send('Rol no reconegut');

        const usuario = await modelo.findByPk(req.session.userId);
        if (!usuario) return res.status(404).send('Usuari no trobat');

        res.render('chat', {
            mensajes,
            nombre: usuario.nombre
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error intern: ' + error);
    }
};

exports.enviarMensaje = async (req, res) => {
    try {
        if (!req.body.mensaje || req.body.mensaje.trim() === '') {
            return res.status(400).send('Missatge buit');
        }

        const modelos = {
            usuari: Usuario,
            tecnic: Tecnico,
            moderador: Moderador
        };

        const modelo = modelos[req.session.rol];
        if (!modelo) return res.status(401).send('Rol no reconegut');

        const usuario = await modelo.findByPk(req.session.userId);
        const autor = usuario ? usuario.nombre : 'Invitat';

        const nuevoMensaje = new Mensaje({
            autor,
            mensaje: req.body.mensaje.trim()
        });

        await nuevoMensaje.save();
        res.redirect('/tecnic?chat=1');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar missatge: ' + error);
    }
};
