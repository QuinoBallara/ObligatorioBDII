const {getByID, get, insert} = require('../services/tipoEstablecimientoService');

async function getTipoEstablecimientoByID(req, res) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }

    const resultsQuery = await getByID(id);

    if (!resultsQuery) {
        return res.status(404).json({message: 'Tipo Establecimiento not found'});
    }

    return res.status(200).json(resultsQuery);
}

async function getTipoEstablecimiento(req, res) {
    const resultsQuery = await get();

    if (!resultsQuery) {
        return res.status(404).json({message: 'No Tipo Establecimiento found'});
    }

    return res.status(200).json(resultsQuery);
}

async function postTipoEstablecimiento(req, res) {
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({message: 'Nombre is required'});
    }

    const resultsQuery = await insert(nombre);

    return res.status(201).json({message: 'Tipo Establecimiento created successfully', id: resultsQuery.insertId});
}

module.exports = {
    getTipoEstablecimientoByID,
    getTipoEstablecimiento,
    postTipoEstablecimiento
}