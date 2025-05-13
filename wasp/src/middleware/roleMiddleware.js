const Usuarios = require('../models/Usuarios');
const Tecnicos = require('../models/Tecnicos');
const Moderadores = require('../models/Moderadores');

async function detectRole(req, res, next) {
  const nombre = req.query?.nombre || req.body?.nombre || req.session?.nombre;

  if (!nombre) return res.redirect('/');

  if (await Usuarios.findOne({ where: { nombre } })) {
    req.userRole = 'usuari';
  } else if (await Moderadores.findOne({ where: { nombre } })) {
    req.userRole = 'moderador';
  } else if (await Tecnicos.findOne({ where: { nombre } })) {
    req.userRole = 'tecnic';
  } else {
    return res.status(403).send('No autoritzat');
  }

  req.nombre = nombre;
  next();
}

module.exports = detectRole;
