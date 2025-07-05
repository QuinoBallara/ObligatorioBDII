const {insertCiudadanoMesa, updateCiudadanoMesaToEmitioVotoTrue, selectCiudadanoMesaByMesaIDAndCiudadanoID, selectCiudadanoMesaByMesaId} = require('../services/ciudadanoMesaService');

async function postCiudadanoMesa(req, res, next) {
    const { emitio_voto } = req.body;
    const { ciudadano_id, mesa_id } = req.params;

    if (!ciudadano_id || !mesa_id || emitio_voto === undefined) {
        return res.status(400).json({ message: 'ciudadano_id, mesa_id and emitio_voto are required' });
    }

    try {
        const result = await insertCiudadanoMesa(ciudadano_id, mesa_id, emitio_voto);
        res.status(201).json({ message: 'CiudadanoMesa inserted successfully', id: result.insertId });
    } catch (error) {
        console.error('Error inserting CiudadanoMesa:', error);
        next(error);
    }
}

async function patchEmitioVoto(req, res, next) {
    const { ciudadano_id, mesa_id } = req.params;


    try {
        const result = await updateCiudadanoMesaToEmitioVotoTrue(ciudadano_id, mesa_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'CiudadanoMesa not found or already updated' });
        }
        res.status(200).json({ message: 'CiudadanoMesa updated successfully' });
    } catch (error) {
        console.error('Error updating CiudadanoMesa:', error);
        next(error);
    }
}

async function getCiudadanoMesaByMesaID(req, res, next) {
    const { mesa_id } = req.params;
    if (!mesa_id) {
        return res.status(400).json({ message: 'mesa_id is required' });
    }   
    try {
        const results = await selectCiudadanoMesaByMesaId(mesa_id);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No CiudadanoMesa found for this mesa_id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching CiudadanoMesa by mesa_id:', error);
        next(error);
    }
}

async function getCiudadanoMesaByMesaIDAndCiudadanoID(req, res, next) {
    const { mesa_id, ciudadano_id } = req.params;

    if (!mesa_id || !ciudadano_id) {
        return res.status(400).json({ message: 'mesa_id and ciudadano_id are required' });
    }

    try {
        const result = await selectCiudadanoMesaByMesaIDAndCiudadanoID(mesa_id, ciudadano_id);
        if (!result) {
            return res.status(404).json({ message: 'CiudadanoMesa not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching CiudadanoMesa by mesa_id and ciudadano_id:', error);
        next(error);
    }
}

module.exports = {
    postCiudadanoMesa,
    patchEmitioVoto,
    getCiudadanoMesaByMesaID,
    getCiudadanoMesaByMesaIDAndCiudadanoID
};