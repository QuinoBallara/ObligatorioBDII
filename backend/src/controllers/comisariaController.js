const { selectByID, select, insert, insertPolicia, selectPoliciaComisariaByComisariaIDAndPoliciaID } = require('../services/comisariaService');

async function getComisariaByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    try {
        const resultsQuery = await selectByID(id);
    
        console.log('Results from getComisariaByID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Comisaria not found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Comisaria by ID:', error);
        next(error);
    }
}

async function getComisaria(req, res, next) {
    
    
    try {
        const resultsQuery = await select();
    
        console.log('Results from getComisaria:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No comisaria found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Comisaria:', error);
        next(error);
    }
}

async function postComisaria(req, res, next) {
    const { nombre, municipio_id } = req.body;
    
    if (!nombre || !municipio_id) {
        return res.status(400).json({ message: 'Nombre and municipio_id are required' });
    }

    try{
        const resultsQuery = await insert(nombre, municipio_id);
    
        return res.status(201).json({ message: 'Comisaria created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Comisaria:', error);
        next(error);
    }

}

async function postPolicia(req, res, next) {
    console.log(req.params)
    const { id } = req.params;
    const { policia_id } = req.body
    
    if (!policia_id || !id) {
        return res.status(400).json({ message: 'policia_id and id are required' });
    }

    try{
        const resultsQuery = await insertPolicia(policia_id, id);
    
        return res.status(201).json({ message: 'Policia created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Policia:', error);
        next(error);
    }

}

async function getPoliciaComisariaByComisariaIDAndCiudadanoID(req, res, next) {
    const { comisaria_id, policia_id } = req.params;

    if (!comisaria_id || !policia_id) {
        return res.status(400).json({ message: 'comisaria_id and policia_id are required' });
    }

    try {
        const resultsQuery = await selectPoliciaComisariaByComisariaIDAndPoliciaID(comisaria_id, policia_id);
    
        console.log('Results from getPoliciaComisariaByComisariaIDAndPoliciaID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Policia not found in Comisaria' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Policia by Comisaria ID and Policia ID:', error);
        next(error);
    }
}


module.exports = {
    getComisaria,
    getComisariaByID,
    postComisaria,
    postPolicia,
    getPoliciaComisariaByComisariaIDAndCiudadanoID
};