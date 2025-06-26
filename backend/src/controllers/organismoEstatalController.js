const { selectOrganismoEstatalByID, selectOrganismoEstatal, insertOrganismoEstatal, insertCiudadanoOrganismoEstatal, selectCiudadanoOrganismoEstatalByOrganismoEstatalID } = require('../services/organismoEstatalService');

async function getOrganismoEstatalByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    try {
        const resultsQuery = await selectOrganismoEstatalByID(id);
    
        console.log('Results from selectOrganismoEstatalByID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Organismo Estatal not found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Organismo Estatal by ID:', error);
        next(error);
    }
}

async function getOrganismoEstatal(req, res, next) {
    
    
    try {
        const resultsQuery = await selectOrganismoEstatal();
    
        console.log('Results from selectOrganismoEstatal:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Organismo Estatal found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Organismo Estatal:', error);
        next(error);
    }
}

async function postOrganismoEstatal(req, res, next) {
    const { nombre } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre is required' });
    }

    try{
        const resultsQuery = await insertOrganismoEstatal(nombre);
    
        return res.status(201).json({ message: 'Organismo Estatal created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Organismo Estatal:', error);
        next(error);
    }

}

async function postCiudadanoOrganismoEstatal(req, res, next) {
    const { ciudadano_id } = req.body;
    const { organismo_estatal_id } = req.params;
    
    if (!ciudadano_id || !organismo_estatal_id) {
        return res.status(400).json({ message: 'ciudadano_id and organismo_estatal_id are required' });
    }

    try{
        const resultsQuery = await insertCiudadanoOrganismoEstatal(ciudadano_id, organismo_estatal_id);
    
        return res.status(201).json({ message: 'Ciudadano Organismo Estatal created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Ciudadano Organismo Estatal:', error);
        next(error);
    }

}

async function getCiudadanoOrganismoEstatalByOrganismoEstatalID(req, res, next) {
    const { organismo_estatal_id } = req.params;

    if (!organismo_estatal_id) {
        return res.status(400).json({ message: 'organismo_estatal_id is required' });
    }
    
    try {
        const resultsQuery = await selectCiudadanoOrganismoEstatalByOrganismoEstatalID(organismo_estatal_id);
    
        console.log('Results from selectCiudadanoOrganismoEstatalByOrganismoEstatalID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Ciudadano Organismo Estatal found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Ciudadano Organismo Estatal by Organismo EstatalID:', error);
        next(error);
    }
}

module.exports = {
    getOrganismoEstatal,
    getOrganismoEstatalByID,
    postOrganismoEstatal,
    postCiudadanoOrganismoEstatal,
    getCiudadanoOrganismoEstatalByOrganismoEstatalID
};