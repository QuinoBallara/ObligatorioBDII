const {getByID, get, insert} = require('../services/eleccionService');

async function getEleccionByID(req, res, next) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const eleccion = await getByID(id);
        if (!eleccion) {
            return res.status(404).json({ message: 'Eleccion not found' });
        }
        res.status(200).json(eleccion);
    } catch (error) {
        console.error('Error fetching eleccion:', error);
        next(error);
    }
}

async function getEleccion(req, res, next) {

    try {
        const elecciones = await get();
        if (!elecciones) {
            return res.status(404).json({ message: 'No eleccion found' });
        }
        res.status(200).json(elecciones);
    } catch (error) {
        console.error('Error fetching eleccion:', error);
        next(error);
    }
}

async function postEleccion(req, res, next) {

    const {fecha, tipo_eleccion_id} = req.body;

    if (!fecha || !tipo_eleccion_id) {
        return res.status(400).json({ message: 'Fecha and tipo are required' });
    }

    try {
        const result = await insert(fecha, tipo_eleccion_id);
        res.status(201).json({ message: 'Eleccion created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating the eleccion:', error);
        next(error);
    }
}


module.exports = {
    getEleccionByID,
    getEleccion,
    postEleccion
}