const mongoose = require('mongoose');

const Mensajes = new mongoose.Schema({
    autor: { type: String, required: true },
    mensaje: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Mensajes', Mensajes);
