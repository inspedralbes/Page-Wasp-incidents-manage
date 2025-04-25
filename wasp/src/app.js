const express = require('express');
require('dotenv').config();

const sequelize = require('./db');
const Incidencias = require('./models/Incidencias');

// Category.hasMany(Motorcycle, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
// Motorcycle.belongsTo(Category, { foreignKey: 'casategoryId' });

const app = express();
app.use(express.urlencoded({ extended: true })); // per formularis
app.use(express.json());

// Rutes EJS
const incidenciaRoutesEJS = require('./routes/incidenciasEJS.routes');

// // Rutes EJS
app.use('/incidencias', incidenciaRoutesEJS);

// // Configuracio Estatica per les Imatges
const path = require('path');
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Ruta de prova
app.get('/', (req, res) => {
  res.render('index');
});


const port = process.env.PORT || 3000;


(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de dades sincronitzada (API JSON)');

    // //Creem un parell de motos i un parell de caterories
    // const catCarretera = await Category.create({ name: 'Carretera' });
    // const catEnduro = await Category.create({ name: 'Enduro' });

    await Incidencias.create({
      descripcio: 'Ordenador roto',
      prioritat: 'Alta',
      departament: 'Matematiques',
      dataincidencia: '12-02-2025'
    });

    await Incidencias.create({
      descripcio: 'Proyector no funciona',
      prioritat: 'Mitjana',
      departament: 'Fisica',
      dataincidencia: '15-03-2025'
    });

    await Incidencias.create({
      descripcio: 'Falta material de oficina',
      prioritat: 'Baixa',
      departament: 'Administracio',
      dataincidencia: '20-04-2025'
    });

    // Engeguem servidor
    app.listen(port, () => {
      console.log(`Servidor escoltant a http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error a l'inici:", error);
  }

})();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));