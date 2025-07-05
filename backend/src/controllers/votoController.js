const {insertVoto} = require('../services/votoService');

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

module.exports = {
    postVoto,
};