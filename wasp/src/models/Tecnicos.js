const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tecnicos = sequelize.define('Tecnicos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Tecnicos;