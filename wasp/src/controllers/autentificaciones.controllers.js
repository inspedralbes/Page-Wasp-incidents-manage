const Usuario = require('../models/Usuarios');
const Tecnico = require('../models/Tecnicos');
const Moderador = require('../models/Moderadores');

const loginView = (req, res) => {
  res.render('login');
};

const loginUser = async (req, res) => {
  const { nombre, contrasena } = req.body;

  let user = await Usuario.findOne({ where: { nombre, contrasena } });
  if (user) {
    console.log('Usuari trobat:', user);
    req.session.userId = user.id;
    req.session.rol = 'usuari';
    return res.redirect('/usuari');
  }

  user = await Moderador.findOne({ where: { nombre, contrasena } });
  if (user) {
    console.log('Usuari trobat:', user);
    req.session.userId = user.id;
    req.session.rol = 'moderador';
    return res.redirect('/moderador');
  }

  user = await Tecnico.findOne({ where: { nombre, contrasena } });
  if (user) {
    console.log('Usuari trobat:', user);
    req.session.userId = user.id;
    req.session.rol = 'tecnic';
    return res.redirect('/tecnic');
  }

  return res.redirect('/login?error=1');
};

module.exports = { loginView, loginUser };
