const setLocals = (req, res, next) => {
  res.locals.rol = req.session.rol;
  res.locals.id = req.session.userId;
  next();
};

module.exports = setLocals;
