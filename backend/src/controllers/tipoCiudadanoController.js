const {get, getByID, insert} = require('../services/tipoCiudadanoService');

async function getTipoCiudadanoByID(req, res) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }

    const resultsQuery = await getByID(id);

    if (!resultsQuery) {
        return res.status(404).json({message: 'Tipo Ciudadano not found'});
    }

    return res.status(200).json(resultsQuery);
}

async function getTipoCiudadano(req, res) {
    const resultsQuery = await get();

    if (!resultsQuery) {
        return res.status(404).json({message: 'No Tipo Ciudadano found'});
    }

    return res.status(200).json(resultsQuery);
}

async function postTipoCiudadano(req, res) {
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({message: 'Nombre is required'});
    }

    const resultsQuery = await insert(nombre);

    return res.status(201).json({message: 'Tipo Ciudadano created successfully', id: resultsQuery.insertId});
}

module.exports = {
    getTipoCiudadanoByID,
    getTipoCiudadano,
    postTipoCiudadano
};