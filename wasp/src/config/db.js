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
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));
  
module.exports = sequelize;