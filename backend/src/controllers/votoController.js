const {insertVoto, selectVoto, selectVotoByID} = require('../services/votoService');

async function postVoto(req, res, next) {
    const { mesa_id, lista_id, es_observado, es_valido } = req.body;

    if (!mesa_id || !lista_id || es_observado === undefined || es_valido === undefined) {
        return res.status(400).json({ message: 'mesa_id, lista_id, es_observado and es_valido are required' });
    }

    try {
        const result = await insertVoto(mesa_id, lista_id, es_observado, es_valido);
        res.status(201).json({ message: 'Voto inserted successfully', id: result.insertId });
    } catch (error) {
        console.error('Error inserting voto:', error);
        next(error);
    }
}

async function getVotoByID(req, res, next) {
    const { voto_id } = req.params;

    if (!voto_id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const voto = await selectVotoByID(voto_id);
        if (!voto) {
            return res.status(404).json({ message: 'Voto not found' });
        }
        res.status(200).json(voto);
    } catch (error) {
        console.error('Error fetching voto:', error);
        next(error);
    }
}

async function getVoto(req, res, next) {
    try {
        const votos = await selectVoto();
        if (!votos) {
            return res.status(404).json({ message: 'No votos found' });
        }
        res.status(200).json(votos);
    } catch (error) {
        console.error('Error fetching votos:', error);
        next(error);
    }
}

module.exports = {
    postVoto,
    getVotoByID,
    getVoto
};