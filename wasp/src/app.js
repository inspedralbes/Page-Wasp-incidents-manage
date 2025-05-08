const express = require('express');
require('dotenv').config();

const sequelize = require('./db');
const path = require('path');

const Actuaciones = require('./models/Actuaciones');
const Incidencias = require('./models/Incidencias');
const Departamentos = require('./models/Departamentos');
const Tecnicos = require('./models/Tecnicos');

Departamentos.hasMany(Incidencias, { foreignKey: 'idd', onDelete: 'CASCADE' });
Incidencias.belongsTo(Departamentos, { foreignKey: 'idd' });

Tecnicos.hasMany(Actuaciones, { foreignKey: 'idt', onDelete: 'CASCADE' });
Actuaciones.belongsTo(Tecnicos, { foreignKey: 'idt' });

Incidencias.hasMany(Actuaciones, { foreignKey: 'idi', onDelete: 'CASCADE' });
Actuaciones.belongsTo(Incidencias, { foreignKey: 'idi' });

Tecnicos.hasMany(Incidencias, { foreignKey: 'idt', onDelete: 'SET NULL' });
Incidencias.belongsTo(Tecnicos, { foreignKey: 'idt' });

const app = express();
app.use(express.urlencoded({ extended: true })); // per formularis
app.use(express.json());

// Rutes EJS
const incidenciaRoutesEJS = require('./routes/incidenciasEJS.routes');
const departamentRoutesEJS = require('./routes/departamentsEJS.routes');

app.use('/incidencias', incidenciaRoutesEJS);
app.use('/departamentos', departamentRoutesEJS)

// // Configuracio Estatica per les Imatges
// app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Perfiles
app.get('/', (req, res) => {
  res.render('usuari');
});

app.get('/tecnic', (req, res) => {
  res.render('tecnic');
});

app.get('/moderador', async (req, res) => {
  const incidencias = await Incidencias.findAll({ include: [Departamentos, Tecnicos] });
  res.render('moderador', { incidencias });
});

// Redirecciones
app.get('/incidencias/incidencia', (req, res) => {
  const page = parseInt(req.query.page);
  res.redirect(`/incidencias/list/${page}`);
});

app.get('/incidencias/tecnic', (req, res) => {
  const page = parseInt(req.query.page);
  res.redirect(`/incidencias/list/tecnic/${page}`);
});

const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de dades sincronitzada (API JSON)');

    const fisica = await Departamentos.create({ nombre: 'Fisica', ubicacio:'Planta baja' });
    const administracio = await Departamentos.create({ nombre: 'Administracio', ubicacio:'Planta mitjana' });

    const juan = await Tecnicos.create({ nombre: 'Juan' });
    const marcos = await Tecnicos.create({ nombre: 'Marcos' });

    await Incidencias.create({
      descripcio: 'Ordenador roto',
      prioritat: 'Alta',
      dataincidencia: '2025-04-02',
      idd: administracio.id,
      idt: juan.id,
    });

    await Incidencias.create({
      descripcio: 'Proyector no funciona',
      prioritat: 'Mitjana',
      dataincidencia: '2025-04-05',
      idd: fisica.id,
    });

    await Incidencias.create({
      descripcio: 'Falta material de oficina',
      prioritat: 'Baixa',
      dataincidencia: '2025-12-3',
      idd: administracio.id,
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