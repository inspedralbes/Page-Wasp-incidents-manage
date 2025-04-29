const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tecnicos = sequelize.define('Tecnicos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tecnicos;