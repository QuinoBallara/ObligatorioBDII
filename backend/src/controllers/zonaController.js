const { selectByID, insert, select } = require('../services/zonaService');

async function getZonaByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    try {
        const resultsQuery = await selectByID(id);
    
        console.log('Results from getZonaByID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Zona not found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Zona by ID:', error);
        next(error);
    }
}

async function getZona(req, res, next) {
    
    
    try {
        const resultsQuery = await select();
    
        console.log('Results from getZona:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Zona found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Zona:', error);
        next(error);
    }
}

async function postZona(req, res, next) {
    const { nombre, municipio_id } = req.body;
    
    if (!nombre || !municipio_id) {
        return res.status(400).json({ message: 'Nombre and municipio_id are required' });
    }

    try{
        const resultsQuery = await insert(nombre, municipio_id);
    
        return res.status(201).json({ message: 'Zona created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Zona:', error);
        next(error);
    }

}

module.exports = {
    getZona,
    postZona,
    getZonaByID
};