
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
    res.redirect(`/${req.session.rol}?no-autoritzat=1`);
  }
}

function isModerador(req, res, next) {
  if (req.session.rol === 'moderador') {
    next();
  } else {
    res.redirect(`/${req.session.rol}?no-autoritzat=1`);
  }
}

function isUsuari(req, res, next) {
  if (req.session.rol === 'usuari') {
    next();
  } else {
    res.redirect(`/${req.session.rol}?no-autoritzat=1`);
  }
}

module.exports = {
  isAuthenticated,
  isTecnic,
  isModerador,
  isUsuari
};
