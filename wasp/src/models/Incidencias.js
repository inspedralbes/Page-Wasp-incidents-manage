const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Incidencias = sequelize.define('Incidencias', {
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prioritat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataincidencia: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  }
});

module.exports = Incidencias;