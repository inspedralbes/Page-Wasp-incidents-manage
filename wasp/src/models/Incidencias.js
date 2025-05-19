const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Incidencias = sequelize.define('Incidencias', {
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prioritat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  horesactuacio: {
    type: DataTypes.DECIMAL(5, 1),
    allowNull: false,
    defaultValue: 0,
  },
  resolt: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  dataincidencia: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
  solicitat: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Incidencias;