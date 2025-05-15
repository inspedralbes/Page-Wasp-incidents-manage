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
    dataactuacio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    },
    visibilitat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = Actuaciones;