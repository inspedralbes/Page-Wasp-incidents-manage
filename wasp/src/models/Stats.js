const mongoose = require('mongoose');

const Stats = new mongoose.Schema({
    url: String,
    usuario: {
        nombre: String,
        rol: String
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    navegador: String
});

module.exports = mongoose.model('Visita', Stats);