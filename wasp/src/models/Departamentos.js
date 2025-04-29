const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Departamentos = sequelize.define('Departamentos', {
    nombre: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    ubicacio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Departamentos;