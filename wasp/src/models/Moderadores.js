const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Moderadores = sequelize.define('Moderadores', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Moderadores;