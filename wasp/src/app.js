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
const departamentoRoutesEJS = require('./routes/departamentosEJS.routes');
const actuacionRoutesEJS = require('./routes/actuacionesEJS.routes');

app.use('/incidencias', incidenciaRoutesEJS);
app.use('/departamentos', departamentoRoutesEJS);
app.use('/actuaciones', actuacionRoutesEJS);

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
  try {
    const incidencias = await Incidencias.findAll({ include: [Departamentos, Tecnicos] });

    // Dividir las incidencias en dos listas
    const incidenciasSinTecnico = incidencias.filter(incidencia => !incidencia.idt); // Sin técnico asignado
    const incidenciasConTecnico = incidencias.filter(incidencia => incidencia.idt); // Con técnico asignado

    res.render('moderador', { incidenciasSinTecnico, incidenciasConTecnico });
  } catch (error) {
    console.error('Error al obtener las incidencias:', error);
    res.status(500).send('Error al obtener las incidencias');
  }
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

    const fisica = await Departamentos.create({ nombre: 'Física', ubicacio: 'Planta baixa' });
    const administracio = await Departamentos.create({ nombre: 'Administració', ubicacio: 'Planta mitjana' });
    const informatica = await Departamentos.create({ nombre: 'Informàtica', ubicacio: 'Planta alta' });
    const quimica = await Departamentos.create({ nombre: 'Química', ubicacio: 'Laboratori 1' });
    const matematiques = await Departamentos.create({ nombre: 'Matemàtiques', ubicacio: 'Aula 3' });

    const juan = await Tecnicos.create({ nombre: 'Juan' });
    const marcos = await Tecnicos.create({ nombre: 'Marcos' });
    const ana = await Tecnicos.create({ nombre: 'Ana' });
    const lucia = await Tecnicos.create({ nombre: 'Lucía' });
    const pedro = await Tecnicos.create({ nombre: 'Pedro' });

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

    await Actuaciones.create({
      descripcio: 'He reiniciado el ordenador pero no ha funcionado, mañana probaré otra vez',
      hores: '0.3',
      resolt: false,
      idt: juan.id,
      idi: 1,
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