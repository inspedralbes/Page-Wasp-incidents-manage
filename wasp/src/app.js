require('dotenv').config();

const sequelize = require('./db');
const path = require('path');

const express = require('express');
const app = express();
const session = require('express-session');

const moment = require('moment');

const detectRole = require('./middleware/roleMiddleware');
const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('./middleware/authMiddleware');
const setLocals = require('./middleware/localsMiddleware');

const Actuaciones = require('./models/Actuaciones');
const Incidencias = require('./models/Incidencias');
const Departamentos = require('./models/Departamentos');
const Categorias = require('./models/Categorias');

const Usuarios = require('./models/Usuarios');
const Tecnicos = require('./models/Tecnicos');
const Moderadores = require('./models/Moderadores');

Departamentos.hasMany(Incidencias, { foreignKey: 'idd', onDelete: 'SET NULL' });
Incidencias.belongsTo(Departamentos, { foreignKey: 'idd' });

Tecnicos.hasMany(Actuaciones, { foreignKey: 'idt', onDelete: 'SET NULL' });
Actuaciones.belongsTo(Tecnicos, { foreignKey: 'idt' });

Incidencias.hasMany(Actuaciones, { foreignKey: 'idi', onDelete: 'SET NULL' });
Actuaciones.belongsTo(Incidencias, { foreignKey: 'idi' });

Tecnicos.hasMany(Incidencias, { foreignKey: 'idt', onDelete: 'SET NULL' });
Incidencias.belongsTo(Tecnicos, { foreignKey: 'idt' });

Categorias.hasMany(Incidencias, { foreignKey: 'idc', onDelete: 'SET NULL' });
Incidencias.belongsTo(Categorias, { foreignKey: 'idc' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: 'secreto', resave: false, saveUninitialized: true }));
app.use(setLocals);

// Rutes EJS
const incidenciaRoutesEJS = require('./routes/incidencias.routes');
const departamentoRoutesEJS = require('./routes/departamentos.routes');
const actuacionRoutesEJS = require('./routes/actuaciones.routes');
const authRoutesEJS = require('./routes/auth.routes');
const categoriaRoutesEJS = require('./routes/categorias.routes');
const { console } = require('inspector');

app.use('/incidencias', incidenciaRoutesEJS);
app.use('/departamentos', departamentoRoutesEJS);
app.use('/actuaciones', actuacionRoutesEJS);
app.use('/categorias', categoriaRoutesEJS);
app.use('/', authRoutesEJS);

app.locals.moment = moment;

// // Configuracio Estatica
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Perfiles
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.error('Error al cerrar sesión:', error);
      return res.status(500).send('Error al cerrar la sessió');
    }
    res.redirect('/login');
  });
});

app.get('/usuari', isAuthenticated, isUsuari, async(req, res) => {
  res.render('usuari', {
    id: req.session.id,
    rol: req.session.rol
  });
});

app.get('/tecnic', isAuthenticated, isTecnic, async (req, res) => {
  try {
    const tecnico = await Tecnicos.findByPk(req.session.userId, { include: [{ model: Incidencias, include: [Departamentos, Categorias] }] });

    if (!tecnico) {
      return res.status(404).send('Tècnic no trobat');
    }

    res.render('tecnic', {
      tecnico,
      incidencias: tecnico.Incidencias,
      rol: req.session.rol,
      id: req.session.userId
    });

  } catch (error) {
    console.error('Error al cargar la vista del tècnic: ' + error);
    res.status(500).send('Error al carregar la pàgina del tècnic: ' + error);
  }
});


app.get('/moderador', isAuthenticated, isModerador, async (req, res) => {
  try {
    const incidencias = await Incidencias.findAll({ include: [Departamentos, Tecnicos, Categorias] });
    const tecnicos = await Tecnicos.findAll();
    const categorias = await Categorias.findAll();
    const departamentos = await Departamentos.findAll();

    const incidenciasNoTecnic = incidencias.filter(incidencia => !incidencia.idt);
    const incidenciasYesTecnic = incidencias.filter(incidencia => incidencia.idt);
    
    res.render('moderador', {tecnicos, categorias, departamentos, incidenciasNoTecnic, incidenciasYesTecnic, id: req.session.id, rol: req.session.rol});

  } catch (error) {
    console.error('Error al cargar la vista del moderador: ' + error);
    res.status(500).send('Error al carregar la pàgina del moderador: ' + error);
  }
});

// Comprobar roles
app.get('/', detectRole, (req, res) => {
  const rol = req.userRole;

  switch (rol) {
    case 'usuari':
      res.render('usuari', { nombre: req.nombre });
      break;
    case 'moderador':
      res.redirect('/moderador?nombre=' + req.nombre);
      break;
    case 'tecnic':
      res.redirect('/tecnic?nombre=' + req.nombre);
      break;
    default:
      res.status(403).send('No autoritzat');
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

    const juan = await Tecnicos.create({ nombre: 'Juan', contrasena: '12345' });
    const marcos = await Tecnicos.create({ nombre: 'Marcos', contrasena: '12345' });
    const ana = await Tecnicos.create({ nombre: 'Ana', contrasena: '12345' });
    const lucia = await Tecnicos.create({ nombre: 'Lucía', contrasena: '12345' });
    const pedro = await Tecnicos.create({ nombre: 'Pedro', contrasena: '12345' });

    const usuario = await Usuarios.create({ nombre: 'user', contrasena: '12345' });
    const moderador = await Moderadores.create({ nombre: 'admin', contrasena: '12345' })

    const informatic = await Categorias.create({ nombre: 'Informàtica' });
    const logistica = await Categorias.create({ nombre: 'Logística' });
    const manteniment = await Categorias.create({ nombre: 'Manteniment' });

    await Incidencias.create({
      descripcio: 'Ordenador roto',
      prioritat: 'Alta',
      horesactuacio: '0.3',
      dataincidencia: '2025-04-02',
      idd: administracio.id,
      idt: juan.id,
      idc: logistica.id,
    });

    await Incidencias.create({
      descripcio: 'Proyector no funciona',
      prioritat: 'Mitjana',
      dataincidencia: '2025-04-05',
      idd: fisica.id,
      idc: informatic.id,
    });

    await Incidencias.create({
      descripcio: 'Falta material de oficina',
      prioritat: 'Baixa',
      dataincidencia: '2025-12-3',
      idd: administracio.id,
      idc: manteniment.id,
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