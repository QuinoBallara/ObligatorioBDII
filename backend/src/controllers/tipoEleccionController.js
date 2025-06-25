const {getByID, get, insert} = require('../services/tipoEleccionService');

async function getTipoEleccionByID(req, res, next) {

    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }

    try {
        const resultsQuery = await getByID(id);

        if (!resultsQuery) {
            return res.status(404).json({message: 'Tipo Eleccion not found'});
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Eleccion by ID:', error);
        next(error);
    }

}

async function getTipoEleccion(req, res, next) {
    
    try {
        const resultsQuery = await get();

        if (!resultsQuery) {
            return res.status(404).json({message: 'No Tipo Eleccion found'});
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Eleccion:', error);
        next(error);
    }
}

async function postTipoEleccion(req, res, next) {

    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({message: 'Nombre is required'});
    }

    try {
        const resultsQuery = await insert(nombre);

        return res.status(201).json({message: 'Tipo Eleccion created successfully', id: resultsQuery.insertId});
    } catch (error) {
        console.error('Error creating Tipo Eleccion:', error);
        next(error);
    }
}

module.exports = {
    getTipoEleccionByID,
    getTipoEleccion,
    postTipoEleccion
}