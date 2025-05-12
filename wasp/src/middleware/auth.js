// Verifica que el usuario está autenticado
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Verifica que es técnico
function isTecnic(req, res, next) {
  if (req.session.rol === 'tecnic') {
    next();
  } else {
    res.status(403).send('Accés denegat: no ets tècnic');
  }
}

// Verifica que es moderador
function isModerador(req, res, next) {
  if (req.session.rol === 'moderador') {
    next();
  } else {
    res.status(403).send('Accés denegat: no ets moderador');
  }
}

// Verifica que es usuari
function isUsuari(req, res, next) {
  if (req.session.rol === 'usuari') {
    next();
  } else {
    res.status(403).send('Accés denegat: no ets usuari');
  }
}

module.exports = {
  isAuthenticated,
  isTecnic,
  isModerador,
  isUsuari
};
