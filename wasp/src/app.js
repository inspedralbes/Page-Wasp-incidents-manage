const express = require('express');
require('dotenv').config();

const sequelize = require('./db');
const Incidencias = require('./models/Incidencias');

// Category.hasMany(Motorcycle, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
// Motorcycle.belongsTo(Category, { foreignKey: 'categoryId' });

// const motorcycleRoutes = require('./routes/motorcycles.routes');
// const categoryRoutes = require('./routes/categories.routes');

const app = express();
app.use(express.urlencoded({ extended: true })); // per formularis
app.use(express.json());

// // Rutes EJS
// const motorcycleRoutesEJS = require('./routes/motorcyclesEJS.routes');
// const categoryRoutesEJS = require('./routes/categoriesEJS.routes');

// // Rutes EJS
// app.use('/motorcycles', motorcycleRoutesEJS);
// app.use('/categories', categoryRoutesEJS);

// // Rutes JSON
// app.use('/api/motorcycles', motorcycleRoutes);
// app.use('/api/categories', categoryRoutes);

// // Configuracio Estatica per les Imatges
// const path = require('path');
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

    // await Motorcycle.create({
    //   name: 'CBR 600 RR',
    //   brand: 'Honda',
    //   cc: 600,
    //   country: 'japon',
    //   categoryId: catCarretera.id,
    // });

    // await Motorcycle.create({
    //   name: 'Africa Twin',
    //   brand: 'Honda',
    //   cc: 1000,
    //   country: 'estados-unidos',
    //   categoryId: catEnduro.id,
    // });

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