const {get, getByID, insert} = require('../services/tipoCiudadanoService');

async function getTipoCiudadanoByID(req, res) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }

    try{
        const resultsQuery = await getByID(id);
    
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
        const resultsQuery = await get();

        if (!resultsQuery) {
            return res.status(404).json({message: 'No Tipo Ciudadano found'});
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Tipo Ciudadano:', error);
        next(error);
    }
}

async function postTipoCiudadano(req, res) {
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({message: 'Nombre is required'});
    }
    try{
        const resultsQuery = await insert(nombre);
    
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