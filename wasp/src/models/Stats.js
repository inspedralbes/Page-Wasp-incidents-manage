const mongoose = require('mongoose');

const Stats = new mongoose.Schema({
    usuario: {
        type: String,
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    navegador: String,
    url: String 
});

module.exports = mongoose.model('Stats', Stats);