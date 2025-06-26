const {
    selectMesaById,
    insertMesa,
    updateAbierta,
    selectCiudadanoAndMesa,
    insertOnCiudadanoMesa,
    updateEmitioVoto,
    selectCiudadanoMesaByMesaId,
    selectVotoByID,
    insertVoto, // PARA DISCUTIR
    selectVotosPerListaPerMesa,
    selectVotosPerPartidoPerMesa,
    selectVotosPerCandidatoPerMesa
} = require('../services/mesaService');


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

async function getCiudadanoMesa(req, res, next) {

    const { mesa_id, ciudadano_id } = req.params;

    if (!mesa_id || !ciudadano_id) {
        return res.status(400).json({ message: 'mesa_id and ciudadano_id are required' });
    }

    try {
        const result = await selectCiudadanoAndMesa(mesa_id, ciudadano_id);
        if (!result) {
            return res.status(404).json({ message: 'CiudadanoMesa not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Ciudadano and Mesa:', error);
        next(error);
    }
    
}

async function postCiudadanoMesa(req, res, next) {

    const { mesa_id, ciudadano_id } = req.body;

    if (!mesa_id || !ciudadano_id) {
        return res.status(400).json({ message: 'mesa_id and ciudadano_id are required' });
    }

    try {
        const result = await insertOnCiudadanoMesa(mesa_id, ciudadano_id);
        res.status(201).json({ message: 'CiudadanoMesa created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating CiudadanoMesa:', error);
        next(error);
    }

}

async function patchEmitioVoto(req, res, next) {
    const { emitio_voto } = req.body;
    const { ciudadano_id, mesa_id } = req.params;

    if (typeof emitio_voto !== 'boolean' || !ciudadano_id || !mesa_id) {
        return res.status(400).json({ message: 'emitio_voto, ciudadano_id and mesa_id are required' });
    }

    try {
        const result = await updateEmitioVoto(emitio_voto, ciudadano_id, mesa_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'CiudadanoMesa not found' });
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

async function getVotoByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const result = await selectVotoByID(id);
        if (!result) {
            return res.status(404).json({ message: 'Voto not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching voto:', error);
        next(error);
    }
}

// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
async function postVoto(req, res, next) {

}

async function getVotosPerListaPerMesa(req, res, next) {
    const { mesa_id } = req.params;

    if (!mesa_id) {
        return res.status(400).json({ message: 'mesa_id is required' });
    }

    try {
        const results = await selectVotosPerListaPerMesa(mesa_id);
        if (!results) {
            return res.status(404).json({ message: 'No votos found for this mesa_id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching votos per lista by mesa_id:', error);
        next(error);
    }
}

async function getVotosPerPartidoPerMesa(req, res, next) {
    const { mesa_id } = req.params;

    if (!mesa_id) {
        return res.status(400).json({ message: 'mesa_id is required' });
    }

    try {
        const results = await selectVotosPerPartidoPerMesa(mesa_id);
        if (!results) {
            return res.status(404).json({ message: 'No votos found for this mesa_id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching votos per partido by mesa_id:', error);
        next(error);
    }
}

async function getVotosPerCandidatoPerMesa(req, res, next) {
    const { mesa_id } = req.params;

    if (!mesa_id) {
        return res.status(400).json({ message: 'mesa_id is required' });
    }

    try {
        const results = await selectVotosPerCandidatoPerMesa(mesa_id);
        if (!results) {
            return res.status(404).json({ message: 'No votos found for this mesa_id' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching votos per candidato by mesa_id:', error);
        next(error);
    }

}

module.exports = {
    getMesaByID,
    postMesa,
    patchMesaAbierta,
    getCiudadanoMesa,
    postCiudadanoMesa,
    patchEmitioVoto,
    getCiudadanoMesaByMesaID,
    getVotoByID,
    postVoto, // PARA DISCUTIR
    getVotosPerListaPerMesa,
    getVotosPerPartidoPerMesa,
    getVotosPerCandidatoPerMesa
};