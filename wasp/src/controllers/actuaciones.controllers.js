const Actuacion = require('../models/Actuaciones');
const Tecnico = require('../models/Tecnicos');
const Incidencia = require('../models/Incidencias');

exports.listarPublicas = async (req, res) => {
  try {
    const incidencia = await Incidencia.findByPk(req.params.id, {
      include: [{
        model: Actuacion,
        where: { visibilitat: true },
        required: false ,
      }]
    });

    if (!incidencia) {  
      return res.status(404).send('Incidència no trobada');
    }

    res.render('actuaciones/list_public', { incidencia, actuaciones: incidencia.Actuaciones });

  } catch (error) {
    console.error('Error al carregar actuacions de la incidència:' + error);
    res.status(500).send('Error al carregar actuacions de la incidència: ' + error.message);
  }
};

exports.listarTodas = async (req, res) => {
  try {
    const actuaciones = await Actuacion.findAll();
    res.render('actuaciones/list_all', { actuaciones });
  } catch (error) {
    res.status(500).send('Error al recuperar actuaciones: ' + error.message);
  }
};

exports.listarPorIncidencia = async (req, res) => {
  try {
    const incidencia = await Incidencia.findByPk(req.params.id, {
      include: Actuacion
    });

    if (!incidencia) {
      return res.status(404).send('Incidència no trobada');
    }

    res.render('actuaciones/list_incidencia', {
      incidencia,
      actuaciones: incidencia.Actuaciones
    });

  } catch (error) {
    console.error('Error al carregar actuacions de la incidència:' + error);
    res.status(500).send('Error al carregar actuacions de la incidència' + error);
  }
};


exports.formCrear = async (req, res) => {
  try {
    const idi = req.params.id;
    const incidencia = await Incidencia.findByPk(idi);

    if (!incidencia) {
      return res.status(404).send('Incidència no trobada');
    }

    res.render('actuaciones/crear', { incidencia, idi });
  } catch (error) {
    res.status(500).send('Error al carregar el formulari: ' + error.message);
  }
};

exports.crear = async (req, res) => {
  try {
    const { descripcio, dataactuacio, hores, resolt, visibilitat, idt, idi } = req.body;

    const actuacion = await Actuacion.create({ descripcio, dataactuacio, hores, visibilitat, idt, idi });
    const incidencia = await Incidencia.findByPk(idi);

    if (resolt) {
      incidencia.resolt = true;
      actuacion.descripcio = descripcio + " (resolt)";

      await actuacion.save();
      await incidencia.save();
    }

    const sumHoras = await Actuacion.sum('hores', { where: { idi: incidencia.id } });

    incidencia.horesactuacio = sumHoras;
    await incidencia.save();

    res.redirect('list/incidencias/' + idi);

  } catch (error) {
    console.error('Error al crear la actuació:', error);
    res.status(500).send('Error al crear la actuació: ' + error.message);
  }
};
