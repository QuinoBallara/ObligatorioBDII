const {
    selectByID,
    insert,
    select,
    insertAutoridad,
    selectAutoridadesByPartidoPoliticoID
} = require('../services/partidoPoliticoService')

async function getPartidoPoliticoByID(req, res, next) {
    
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    } try {

        const resultsQuery = await selectByID(id);

        if (!resultsQuery) {
            return res.status(400).json({message: 'Partido Politico not found'});
        }

        return res.status(200).json(resultsQuery);
    } catch(error) {
        console.error('Error fetching Partido Politico by ID', error);
        next(error);
    }
}

async function postPartidoPolitico(req, res, next) {
    
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).jsons({message: 'Nombre is required'})
    }

    try {
        const resultsQuery = await insert(nombre);

        return res.status(201).json({message: 'Partido Politico created successfully', partidoPolitico_id: resultsQuery.insertId});
    } catch(error) {
        console.error('Error creatin Partido Politico:', error);
        next(error);
    }
}

async function getPartidoPolitico(req, res, next) {

    try {
        const resultsQuery = await select();

        if (!resultsQuery) {
            return res.status(404).json({message: 'No Partido Politico found'});
        }

        return res.status(200).json(resultsQuery);
    } catch(error) {
        console.error('Error fetching Partido Politico:', error);
        next(error);
    }
}

async function postAutoridadPartidoPolitico(req, res, next) {
    const {ciudadano_id, partidoPolitico_id, fecha_inicio, fecha_fin, tipo_ciudadano_id} = req.body;

    if (!ciudadano_id || !partidoPolitico_id || !fecha_inicio || !fecha_fin || !tipo_ciudadano_id) {
        return res.status(400).json({message: 'Ciudadano ID, Partido Politico ID, Fecha Inicio, Fecha Fin and Tipo Ciudadano ID are required'});
    }

    try {
        const resultsQuery = await insertAutoridad(ciudadano_id, partidoPolitico_id, fecha_inicio, fecha_fin, tipo_ciudadano_id);
        
        return res.status(201).json({message: 'Autoridad created successfully', autoridad_id: resultsQuery.insertId});
    } catch (error) {
        console.error('Error creating Autoridad:', error);
        next(error);
    }
}

async function getAutoridadesByPartidoPoliticoID(req, res, next) {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({message: 'ID is required'})
    }
    try {
        const resultsQuery = await selectAutoridadesByPartidoPoliticoID(id);

        if (!resultsQuery) {
            return res.status(404).json({message: 'No Autoridad found'});
        }

        return res.status(200).json(resultsQuery);
    } catch(error) {
        console.error('Error fetching Autoridad:', error);
        next(error);
    }
}

module.exports = {
    getPartidoPoliticoByID,
    postPartidoPolitico,
    getPartidoPolitico,
    postAutoridadPartidoPolitico,
    getAutoridadesByPartidoPoliticoID
}