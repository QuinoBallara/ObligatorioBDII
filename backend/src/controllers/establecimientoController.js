const {selectByID, select, insert} = require('../services/establecimientoService')

async function getEstablecimientoByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    try {
        const resultsQuery = await selectByID(id);
    
        console.log('Results from selectEstablecimientoByID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Establecimiento not found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Establecimiento by ID:', error);
        next(error);
    }
}

async function postEstablecimiento(req, res, next) {
    const { nombre, direccion, tipo_establecimiento_id, zona_id } = req.body;
    
    if (!nombre || !direccion || !tipo_establecimiento_id || !zona_id) {
        return res.status(400).json({ message: 'nombre, direccion, tipo_establecimiento_id and zona_id are required' });
    }

    try{
        const resultsQuery = await insert(nombre, direccion, tipo_establecimiento_id, zona_id);
    
        return res.status(201).json({ message: 'Establecimiento created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Establecimiento:', error);
        next(error);
    }

}

async function getEstablecimiento(req, res, next) {

    try {
        const resultsQuery = await select();
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Establecimiento found' });
        }
    
        return res.status(200).json(resultsQuery);
    } catch(error) {
        console.error('Error fetching Establecimiento:', error);
        next(error);
    }
}

module.exports = {
    getEstablecimiento,
    getEstablecimientoByID,
    postEstablecimiento
}