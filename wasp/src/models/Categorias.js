const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorias = sequelize.define('Categorias', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Categorias;