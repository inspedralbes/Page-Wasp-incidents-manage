const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Incidencias = sequelize.define('Incidencias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prioritat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departament: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataincidencia: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Incidencias;