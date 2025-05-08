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
    resolt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Actuaciones;