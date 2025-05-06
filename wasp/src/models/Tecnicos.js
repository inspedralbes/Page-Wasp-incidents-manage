const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tecnicos = sequelize.define('Tecnicos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tecnicos;