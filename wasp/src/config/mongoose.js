const mongoose = require('mongoose');

const connectMongoDB = () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:example@mongo:27017/logs?authSource=admin';

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Conexión a MongoDB'))
        .catch(err => {
            console.error('Error al conectar a MongoDB:', err.message);
            process.exit(1);
        });
};

module.exports = { connectMongoDB };