require('dotenv').config();

const sequelize = require('./config/db');
const path = require('path');
const { connectMongoDB } = require('./config/mongoose');

const express = require('express');
const app = express();
const session = require('express-session');

const moment = require('moment');

const { isAuthenticated, isTecnic, isModerador, isUsuari } = require('./middleware/authMiddleware');
const detectRole = require('./middleware/roleMiddleware');
const setLocals = require('./middleware/localsMiddleware');
const registerLogs = require('./middleware/registerLogs');

const Actuaciones = require('./models/Actuaciones');
const Incidencias = require('./models/Incidencias');
const Departamentos = require('./models/Departamentos');
const Categorias = require('./models/Categorias')

const Usuarios = require('./models/Usuarios');
const Tecnicos = require('./models/Tecnicos');
const Moderadores = require('./models/Moderadores');

const Stats = require('./models/Stats');
const Mensajes = require('./models/Mensajes');

connectMongoDB();

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

app.use(registerLogs);

app.use(session({ secret: 'tortillapatata', resave: false, saveUninitialized: true }));
app.use(setLocals);

// Rutes EJS
const incidenciaRoutesEJS = require('./routes/incidencias.routes');
const actuacionRoutesEJS = require('./routes/actuaciones.routes');
const datomongodbRoutesEJS = require('./routes/datosmongodb.routes');

const autentificacionRoutesEJS = require('./routes/autentificaciones.routes');
const otroRoutesEJS = require('./routes/otros.routes');

const { console } = require('inspector');

app.use('/incidencias', incidenciaRoutesEJS);
app.use('/actuaciones', actuacionRoutesEJS);
app.use('/api', datomongodbRoutesEJS);

app.use('/otros', otroRoutesEJS);
app.use('/', autentificacionRoutesEJS);


app.locals.moment = moment;

// Configuracio Estatica
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
      console.error('Error al tancar sesió:', error);
      return res.status(500).send('Error al tancar la sessió');
    }
    res.redirect('/login');
  });
});

app.get('/usuari', isAuthenticated, isUsuari, async (req, res) => {
  res.render('usuari', {
    id: req.session.id,
    rol: req.session.rol
  });
});

app.get('/tecnic', isAuthenticated, isTecnic, async (req, res) => {
  try {
    const { categoria, prioritat, departament, ordre, sentit } = req.query;
    const direccio = sentit === 'asc' ? 1 : -1;

    const tecnico = await Tecnicos.findByPk(req.session.userId, {
      include: [{ model: Incidencias, include: [Departamentos, Categorias] }]
    });

    const categorias = await Categorias.findAll();
    const departamentos = await Departamentos.findAll();


    if (!tecnico) {
      return res.status(404).send('Tècnic no trobat');
    }

    let incidencias = tecnico.Incidencias;

    if (categoria) {
      incidencias = incidencias.filter(i => i.Categoria.nombre === categoria);
    }
    if (departament) {
      incidencias = incidencias.filter(i => i.Departamento && i.Departamento.nombre === departament);
    }

    if (ordre === 'hores') {
      incidencias.sort((a, b) => direccio * (a.horesactuacio - b.horesactuacio));
    } else if (ordre === 'prioritat') {
      const prioridadOrden = { Alta: 3, Mitjana: 2, Baixa: 1 };
      incidencias.sort((a, b) => direccio * ((prioridadOrden[a.prioritat] || 0) - (prioridadOrden[b.prioritat] || 0)));
    } else if (ordre === 'data') {
      incidencias.sort((a, b) => direccio * (new Date(a.dataincidencia) - new Date(b.dataincidencia)));
    }

    const mensajes = await Mensajes.find().sort({ timestamp: 1 });

    res.render('tecnic', {
      tecnico,
      incidencias,

      categoria,
      prioritat,
      departament,

      categorias,
      departamentos,

      rol: req.session.rol,
      id: req.session.userId,

      mensajes,
      ordre,
      sentit
    });

  } catch (error) {
    console.error('Error al carregar la vista del tècnic: ' + error);
    res.status(500).send('Error al carregar la pàgina del tècnic: ' + error);
  }
});

app.get('/moderador', isAuthenticated, isModerador, async (req, res) => {
  try {
    const incidencias = await Incidencias.findAll({ include: [Departamentos, Tecnicos, Categorias] });
    const tecnicos = await Tecnicos.findAll();
    const categorias = await Categorias.findAll();
    const departamentos = await Departamentos.findAll();

    const incidenciasNoTecnic = incidencias.filter(incidencia => !incidencia.idt && !incidencia.resolt);
    const incidenciasYesTecnic = incidencias.filter(incidencia => incidencia.idt && !incidencia.resolt);
    const incidenciasComplete = incidencias.filter(incidencia => incidencia.resolt);

    res.render('moderador', { tecnicos, categorias, departamentos, incidenciasNoTecnic, incidenciasYesTecnic, incidenciasComplete, id: req.session.id, rol: req.session.rol });

  } catch (error) {
    console.error('Error al carregar la vista del moderador: ' + error);
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

    // EJEMPLOS DE PRUEBA; ELIMINAR EN CASO DE USO REAL
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

    await Incidencias.create({
      descripcio: 'Pantalla parpadea constantemente',
      prioritat: 'Alta',
      horesactuacio: '0.6',
      dataincidencia: '2025-05-18',
      idd: informatic.id,
      idt: juan.id,
      idc: manteniment.id,
    });

    await Incidencias.create({
      descripcio: 'Impresora atascada',
      prioritat: 'Mitjana',
      dataincidencia: '2025-05-15',
      idd: administracio.id,
      idt: marcos.id,
      idc: manteniment.id,
    });

    await Incidencias.create({
      descripcio: 'Error en software contable',
      prioritat: 'Alta',
      horesactuacio: '1.0',
      dataincidencia: '2025-05-16',
      idd: administracio.id,
      idt: ana.id,
      idc: informatic.id,
    });

    await Incidencias.create({
      descripcio: 'Red inalámbrica caida',
      prioritat: 'Alta',
      horesactuacio: '0.8',
      dataincidencia: '2025-05-17',
      idd: informatic.id,
      idt: lucia.id,
      idc: informatic.id,
    });

    await Incidencias.create({
      descripcio: 'Luz del laboratorio fundida',
      prioritat: 'Baixa',
      dataincidencia: '2025-05-14',
      idd: quimica.id,
      idc: manteniment.id,
    });

    await Actuaciones.create({
      descripcio: 'Limpieza y reconfiguración de la impresora',
      hores: '0.5',
      resolt: true,
      idt: marcos.id,
      idi: 6, 
    });

    await Actuaciones.create({
      descripcio: 'Actualización del software contable',
      hores: '1.2',
      resolt: false,
      idt: ana.id,
      idi: 7,
    });

    await Actuaciones.create({
      descripcio: 'Reinicio y cambio de router',
      hores: '0.7',
      resolt: true,
      idt: lucia.id,
      idi: 8,
    });
    // EJEMPLOS DE PRUEBA; ELIMINAR EN CASO DE USO REAL

    app.listen(port, () => {
      console.log(`Servidor escoltant a http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error a l'inici:", error);
  }

})();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));