const Usuario = require('../models/Usuarios');
const Tecnico = require('../models/Tecnicos');
const Moderador = require('../models/Moderadores');

const loginView = (req, res) => {
  res.render('login');
};

const loginUser = async (req, res) => {
  const { nombre, contrasenya } = req.body;

  let user = await Usuario.findOne({ where: { nombre, contrasena } });
  if (user) {
    req.session.userId = user.id;
    req.session.rol = 'usuari';
    return res.redirect('/');
  }

  user = await Moderador.findOne({ where: { nombre, contrasena } });
  if (user) {
    req.session.userId = user.id;
    req.session.rol = 'moderador';
    return res.redirect('/moderador');
  }

  user = await Tecnico.findOne({ where: { nombre, contrasena } });
  if (user) {
    req.session.userId = user.id;
    req.session.rol = 'tecnic';
    return res.redirect('/tecnic');
  }

  res.status(401).send('Usuari o contrasenya incorrectes');
};

module.exports = { loginView, loginUser };
