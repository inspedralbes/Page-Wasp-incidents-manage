const Visita = require('../models/Stats');

module.exports = (req, res, next) => {
    const url = req.originalUrl;

    const rutasPermitidas = ['/usuari', '/tecnic', '/moderador'];

    if (!rutasPermitidas.includes(url)) return next();

    let usuario;

    if (url === '/tecnic') {
        usuario = 'tecnic';
    } else if (url === '/usuari') {
        usuario = 'usuari';
    } else if (url === '/moderador') {
        usuario = 'moderador' ;
    }

        const nuevaVisita = new Visita({
        url,
        usuario,
        navegador: req.headers['user-agent']
    });
    
    nuevaVisita.save()
        .then(() => console.log(`📝 Visita guardada: ${url}`))
        .catch(err => console.error('❌ Error guardando visita:', err));

    next();
};
