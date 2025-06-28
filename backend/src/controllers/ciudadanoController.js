
const { getByID, get, insert , insertCredencial} = require('../services/ciudadanoService');


async function getCiudadanoByID(req, res, next) {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const resultsQuery = await getByID(id);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Ciudadano not found' });
        }
    
        return res.status(200).json(resultsQuery);
    } catch(error) {
        console.error('Error fetching Ciudadano by ID:', error);
        next(error);
    }
}

async function getCiudadano(req, res, next) {

    try {
        const resultsQuery = await get();
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Ciudadano found' });
        }
    
        return res.status(200).json(resultsQuery);
    } catch(error) {
        console.error('Error fetching Ciudadano:', error);
        next(error);
    }
}

async function postCiudadano(req, res, next) {

    const {id, credencial_civica, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo } = req.body;

    if (!id || !credencial_civica || !primer_nombre || !primer_apellido || !fecha_nacimiento) {
        return res.status(400).json({ message: 'ID, Credencial Civica, Primer Nombre, Primer Apellido, and Fecha Nacimiento are required' });
    }

    try{
        const existingCiudadano = await getByID(id);

        if (existingCiudadano) {
            return res.status(409).json({ message: 'Ciudadano with this ID already exists' });
        }

    } catch (error) {
        console.error('Error checking existing Ciudadano:', error);
        next(error);
    }

    try {
        const resultsQueryCiudadano = await insert(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo);
    
        const resultsQueryCredencial = await insertCredencial(credencial_civica, id);
    
        return res.status(201).json({ message: 'Ciudadano created successfully', ciudadano_id: resultsQueryCiudadano.insertId, credencial_id: resultsQueryCredencial.insertId });
    } catch(error) {
        console.error('Error creating Ciudadano:', error);
        next(error);
    }
}

module.exports = {
    getCiudadanoByID,
    getCiudadano,
    postCiudadano
};