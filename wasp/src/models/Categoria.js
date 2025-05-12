const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Categoria;