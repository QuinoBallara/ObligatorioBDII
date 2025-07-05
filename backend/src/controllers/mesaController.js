const {
    selectMesaById,
    insertMesa,
    updateAbierta,
    selectVotosPerListaPerMesa,
    selectVotosPerPartidoPerMesa,
    selectVotosPerCandidatoPerMesa,
    selectMesa
} = require('../services/mesaService');

async function getMesa(req, res, next) {
    try {
        const resultsQuery = await selectMesa();
        console.log('Results from selectMesa:', resultsQuery);

        if (!resultsQuery) {
            return res.status(404).json({ message: 'No mesas found' });
        }

        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Mesa:', error);
        throw error;
    }
}

async function getMesaByID(req, res, next) {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const mesa = await selectMesaById(id);
        if (!mesa) {
            return res.status(404).json({ message: 'Mesa not found' });
        }
        res.status(200).json(mesa);
    } catch (error) {
        console.error('Error fetching mesa:', error);
        next(error);
    }
}

async function postMesa(req, res, next) {

    const { circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id } = req.body;

    if (!circuito_id || !establecimiento_id || !accessible || !vocal_id || !presidente_id || !secretario_id || !policia_id || !eleccion_id) {
        return res.status(400).json({ message: 'circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, elecicon_id are required' });
    }

    try {
        const result = await insertMesa(circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id);
        res.status(201).json({ message: 'Mesa created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating mesa:', error);
        next(error);
    }

}

async function patchMesaAbierta(req, res, next) {

    const { id } = req.params;
    const { esta_abierta } = req.body;

    if (!id || typeof esta_abierta !== 'boolean') {
        return res.status(400).json({ message: 'ID and esta_abierta are required' });
    }

    try {
        const hasBeenOpened = await selectVotosPerListaPerMesa(id);
        console.log(hasBeenOpened)
        if (hasBeenOpened) {
            return res.status(400).json({ message: 'Cannot reopen a mesa that has already been closed after voting.' });
        }

        const result = await updateAbierta(id, esta_abierta);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mesa not found' });
        }
        res.status(200).json({ message: 'Mesa updated successfully' });
    } catch (error) {
        console.error('Error updating mesa:', error);
        next(error);
    }

}




async function getVotosPerListaPerMesa(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'id is required' });
    }

    try {
        const results = await selectVotosPerListaPerMesa(id);
        if (!results) {
            return res.status(404).json({ message: 'No votos found for this id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching votos per lista by id:', error);
        next(error);
    }
}

async function getVotosPerPartidoPerMesa(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'id is required' });
    }

    try {
        const results = await selectVotosPerPartidoPerMesa(id);
        if (!results) {
            return res.status(404).json({ message: 'No votos found for this id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching votos per partido by id:', error);
        next(error);
    }
}

async function getVotosPerCandidatoPerMesa(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'id is required' });
    }

    try {
        const results = await selectVotosPerCandidatoPerMesa(id);
        if (!results) {
            return res.status(404).json({ message: 'No votos found for this id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching votos per candidato by id:', error);
        next(error);
    }

}

module.exports = {
    getMesaByID,
    postMesa,
    patchMesaAbierta,
    getVotosPerListaPerMesa,
    getVotosPerPartidoPerMesa,
    getVotosPerCandidatoPerMesa,
    getMesa
};