const Stats = require('../models/Stats'); 

// Estadísticas por rol (usuario)
exports.estadisticasRol = async (req, res) => {
    try {
        const datos = await Stats.aggregate([
            {
                $group: {
                    _id: "$usuario",  
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estadísticas por rol' });
    }
};

// Estadísticas por hora
exports.estadisticasHora = async (req, res) => {
    try {
        const datos = await Stats.aggregate([
            {
                $group: {
                    _id: { $hour: "$timestamp" },  
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estadísticas por hora' });
    }
};
