const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuarios = sequelize.define('Usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuarios;