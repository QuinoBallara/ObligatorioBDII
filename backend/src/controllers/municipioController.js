const { selectByID, insert, select } = require('../services/municipioService');

async function getMunicipioByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    try {
        const resultsQuery = await selectByID(id);
    
        console.log('Results from getMunicipioByID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Municipio not found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Municipio by ID:', error);
        next(error);
    }
}

async function getMunicipio(req, res, next) {
    
    
    try {
        const resultsQuery = await select();
    
        console.log('Results from getMunicipio:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Municipio found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Municipio:', error);
        next(error);
    }
}

async function postMunicipio(req, res, next) {
    const { nombre, departamento_id } = req.body;
    
    if (!nombre || !departamento_id) {
        return res.status(400).json({ message: 'Nombre and departamento_id are required' });
    }

    try{
        const resultsQuery = await insert(nombre, departamento_id);
    
        return res.status(201).json({ message: 'Municipio created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Municipio:', error);
        next(error);
    }

}

module.exports = {
    getMunicipio,
    postMunicipio,
    getMunicipioByID
};