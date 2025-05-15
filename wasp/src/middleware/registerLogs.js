const Visita = require('../models/Visita');

module.exports = (req, res, next) => {
    const url = req.originalUrl;

    const rutasPermitidas = ['/usuari', '/tecnic', '/moderador'];

    if (!rutasPermitidas.includes(url)) return next();

    let usuario;

    if (url === '/tecnic') {
        usuario = { nombre: 'anonim', rol: 'tecnic' };
    } else if (url === '/usuari') {
        usuario = { nombre: 'anonim', rol: 'usuari' };
    } else if (url === '/moderador') {
        usuario = { nombre: 'anonim', rol: 'moderador' };
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
