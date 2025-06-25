const {getByID, get, insert} = require('../services/tipoEstablecimientoService');

async function getTipoEstablecimientoByID(req, res, next) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }

    try {
        const resultsQuery = await getByID(id);
    
        if (!resultsQuery) {
            return res.status(404).json({message: 'Tipo Establecimiento not found'});
        }
    
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Establecimiento by ID:', error);
        next(error);
    }
}

async function getTipoEstablecimiento(req, res, next) {

    try{
        const resultsQuery = await get();
    
        if (!resultsQuery) {
            return res.status(404).json({message: 'No Tipo Establecimiento found'});
        }
    
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Establecimiento:', error);
        next(error);
    }
}

async function postTipoEstablecimiento(req, res) {
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({message: 'Nombre is required'});
    }

    try{
        const resultsQuery = await insert(nombre);
    
        return res.status(201).json({message: 'Tipo Establecimiento created successfully', id: resultsQuery.insertId});
    } catch (error) {
        console.error('Error creating Tipo Establecimiento:', error);
        next(error);
    }
}

module.exports = {
    getTipoEstablecimientoByID,
    getTipoEstablecimiento,
    postTipoEstablecimiento
}