const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Departamentos = sequelize.define('Departamentos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Departamentos;