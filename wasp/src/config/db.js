const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(

  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,

  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => console.log('Connexió a la base de dades exitosa'))
  .catch(err => console.error('Error al connectar a la base de dades:', err));
  
module.exports = sequelize;