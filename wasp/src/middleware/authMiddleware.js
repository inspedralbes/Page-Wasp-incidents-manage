
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

function isTecnic(req, res, next) {
  if (req.session.rol === 'tecnic') {
    next();
  } else {
    res.redirect('/no-autoritzat?rol=tecnic');
  }
}

function isModerador(req, res, next) {
  if (req.session.rol === 'moderador') {
    next();
  } else {
    res.redirect('/no-autoritzat?rol=tecnic');
  }
}

function isUsuari(req, res, next) {
  if (req.session.rol === 'usuari') {
    next();
  } else {
    res.redirect('/no-autoritzat?rol=tecnic');
  }
}

module.exports = {
  isAuthenticated,
  isTecnic,
  isModerador,
  isUsuari
};
