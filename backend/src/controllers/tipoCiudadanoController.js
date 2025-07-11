const {selectTipoCiudadano, selectTipoCiudadanoByID, insertTipoCiudadano} = require('../services/tipoCiudadanoService');

async function getTipoCiudadanoByID(req, res, next) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }

    try{
        const resultsQuery = await selectTipoCiudadanoByID(id);
    
        if (!resultsQuery) {
            return res.status(404).json({message: 'Tipo Ciudadano not found'});
        }
    
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Ciudadano by ID:', error);
        next(error);
    }
}

async function getTipoCiudadano(req, res, next) {

    try {
        const resultsQuery = await selectTipoCiudadano();

        if (!resultsQuery) {
            return res.status(404).json({message: 'No Tipo Ciudadano found'});
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Ciudadano:', error);
        next(error);
    }
}

async function postTipoCiudadano(req, res, next) {
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({message: 'Nombre is required'});
    }
    try{
        const resultsQuery = await insertTipoCiudadano(nombre);
    
        return res.status(201).json({message: 'Tipo Ciudadano created successfully', id: resultsQuery.insertId});
    }  catch (error) {
        console.error('Error creating Tipo Ciudadano:', error);
        next(error);
    }
}

module.exports = {
    getTipoCiudadanoByID,
    getTipoCiudadano,
    postTipoCiudadano
};