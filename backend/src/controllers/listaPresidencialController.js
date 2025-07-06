const {
    selectListaPresidencialByID,
    selectListaPresidencial,
    insertListaPresidencial,
    selectListaPresidencialByEleccion,
    selectListaPresidencialByEleccionAndPartidoPolitico
} = require('../services/listaPresidencialService');

const { insertCiudadanoListaPresidencial, selectCiudadanoListaPresidencialByListaPresidencialId } = require('../services/ciudadanoListaPresidencialService');

const { insertLista } = require('../services/listaService');

async function getListaPresidencialByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const resultsQuery = await selectListaPresidencialByID(id);

        if (!resultsQuery) {
            return res.status(404).json({ message: 'Lista Presidencial not found' });
        }

        const ciudadanos = await selectCiudadanoListaPresidencialByListaPresidencialId(resultsQuery.lista_id);
        resultsQuery.ciudadanos = ciudadanos || [];

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Lista Presidencial by ID', error);
        next(error);
    }
}

async function getListaPresidencial(req, res, next) {
    try {
        const resultsQuery = await selectListaPresidencial();

        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Lista Presidencial found' });
        }

        // Fetch ciudadanos for each listaPresidencial
        for (const listaPresidencial of resultsQuery) {
            const ciudadanos = await selectCiudadanoListaPresidencialByListaPresidencialId(listaPresidencial.lista_id);
            listaPresidencial.ciudadanos = ciudadanos || [];
        }


        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Lista Presidencial:', error);
        next(error);
    }
}

async function postListaPresidencial(req, res, next) {
    const { eleccion_id, partido_politico_id, departamento_id, numero, ciudadanos } = req.body;

    if (!eleccion_id || !partido_politico_id || !departamento_id || !numero || !ciudadanos || !Array.isArray(ciudadanos)) {
        return res.status(400).json({ message: 'All fields are required and ciudadanos must be an array' });
    }

    try {
        // First, insert the lista using eleccion_id
        const lista = await insertLista(eleccion_id);
        
        if (!lista || !lista.insertId) {
            return res.status(500).json({ message: 'Failed to create Lista' });
        }
      
        
        const listaPresidencial = await insertListaPresidencial(lista.insertId, 
            partido_politico_id,
            departamento_id,
            numero);
        
        // Insert each ciudadano in the lista presidencial
        for (const ciudadano of ciudadanos) {
            if (!ciudadano.ciudadano_id || !ciudadano.tipo_ciudadano_id || !ciudadano.numero) {
                return res.status(400).json({ message: 'Each ciudadano must have ciudadano_id, tipo_ciudadano_id, and numero' });
            }
            
            
            await insertCiudadanoListaPresidencial(lista.insertId, ciudadano.ciudadano_id, ciudadano.tipo_ciudadano_id, ciudadano.numero);
        }

        return res.status(201).json({ message: 'Lista Presidencial created successfully', data: listaPresidencial });
    } catch (error) {
        console.error('Error creating Lista Presidencial:', error);
        next(error);
    }
}

async function getListaPresidencialByEleccion(req, res, next) {
    const { eleccion_id } = req.params;

    if (!eleccion_id) {
        return res.status(400).json({ message: 'Eleccion ID is required' });
    }

    try {
        const resultsQuery = await selectListaPresidencialByEleccion(eleccion_id);

        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Lista Presidencial found for this Eleccion' });
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Lista Presidencial by Eleccion ID:', error);
        next(error);
    }
}

async function getListaPresidencialByEleccionAndPartidoPolitico(req, res, next) {
    const { eleccion_id, partido_politico_id } = req.params;

    if (!eleccion_id || !partido_politico_id) {
        return res.status(400).json({ message: 'Eleccion ID and Partido Politico ID are required' });
    }

    try {
        const resultsQuery = await selectListaPresidencialByEleccionAndPartidoPolitico(eleccion_id, partido_politico_id);

        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Lista Presidencial found for this Eleccion and Partido Politico' });
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Lista Presidencial by Eleccion ID and Partido Politico ID:', error);
        next(error);
    }
}

module.exports = {
    getListaPresidencialByID,
    getListaPresidencial,
    postListaPresidencial,
    getListaPresidencialByEleccion,
    getListaPresidencialByEleccionAndPartidoPolitico
};