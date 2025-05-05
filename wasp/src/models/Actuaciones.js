const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Actuaciones = sequelize.define('Actuaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hores: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    resolt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Actuaciones;