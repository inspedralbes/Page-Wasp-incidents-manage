const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Actuaciones = sequelize.define('Actuaciones', {
    descripcio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hores: {
        type: DataTypes.DECIMAL(5, 1),
        allowNull: false,
    }, 
    visibilitat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    resolt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = Actuaciones;