const pool = require('../db/db').promise();


async function selectMesaById(id) {

    const query = `SELECT * FROM Mesa WHERE id = ?`;

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function insertMesa(circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id) {

    const query = `
        INSERT INTO Mesa (circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.query(query, [circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id]);
        console.log('Mesa inserted successfully:', result);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }

}

async function updateAbierta(id, esta_abierta) {
    const query = 'UPDATE Mesa SET esta_abierta = ? WHERE id = ?';
    try {
        const [result] = await pool.query(query, [esta_abierta, id]);
        console.log('Mesa updated successfully:', result);
        return { affectedRows: result.affectedRows };
    } catch (error) {
        throw error;
    }
}

async function selectCiudadanoAndMesa(mesa_id, ciudadano_id) {
    const query = `
        SELECT c.id AS ciudadano_id, c.primer_nombre, c.segundo_nombre, c.primer_apellido, c.segundo_apellido,
               cm.mesa_id, cm.emitio_voto
        FROM Ciudadano c
        JOIN Ciudadano_Mesa cm on c.id = cm.ciudadano_id
        WHERE cm.mesa_id = ? AND c.id = ?
    `;
    try {
        const [rows] = await pool.query(query, [mesa_id, ciudadano_id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function insertOnCiudadanoMesa(ciudadano_id, mesa_id) {
    const query = 'INSERT INTO Ciudadano_Mesa (ciudadano_id, mesa_id) VALUES (?, ?)';
    try {
        const [result] = await pool.query(query, [ciudadano_id, mesa_id, emitio_voto]);
        console.log('Ciudadano_Mesa inserted successfully:', result);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
    
}

async function updateEmitioVoto(emitio_voto, ciudadano_id, mesa_id) {
    const query = 'UPDATE Ciudadano_Mesa SET emitio_voto = ? WHERE ciudadano_id = ? AND mesa_id = ?';
    try {
        const [result] = await pool.query(query, [emitio_voto, ciudadano_id, mesa_id]);
        console.log('Ciudadano_Mesa updated successfully:', result);
        return { affectedRows: result.affectedRows };
    } catch (error) {
        throw error;
    }
    
}

async function selectCiudadanoMesaByMesaId(mesa_id) {
    const query = `
        SELECT c.id AS ciudadano_id, c.primer_nombre, c.segundo_nombre, c.primer_apellido, c.segundo_apellido,
               cm.mesa_id, cm.emitio_voto
        FROM Ciudadano c
        JOIN Ciudadano_Mesa cm ON c.id = cm.ciudadano_id
        WHERE cm.mesa_id = ?
    `;
    try {
        const [rows] = await pool.query(query, [mesa_id]);
        if (rows.length > 0) {
            return rows;
        }
        return rows;
    } catch (error) {
        throw error;
    }
}

async function selectVotoByID(id) {
    const query = 'SELECT * FROM Voto WHERE id = ?';
    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
async function insertVoto() {

}

async function selectVotosPerListaPerMesa(mesa_id) {

    const query = `SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT('Lista ', v.lista_id)
    END AS Lista,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    COUNT(*) AS 'Cantidad de Votos'
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
WHERE v.es_observado = FALSE
GROUP BY 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT('Lista ', v.lista_id)
    END,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END
ORDER BY Lista;`;

    try {
        const [rows] = await pool.query(query, [mesa_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function selectVotosPerPartidoPerMesa(mesa_id) {
    
    const query = `SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    COUNT(*) AS 'Cantidad de Votos'
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
WHERE v.es_observado = FALSE
GROUP BY 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END
ORDER BY Partido;`;

    try {
        const [rows] = await pool.query(query, [mesa_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }

}

async function selectVotosPerCandidatoPerMesa(mesa_id) {

    const query = `SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT_WS(' ', 
            NULLIF(c.primer_nombre, ''), 
            NULLIF(c.segundo_nombre, ''), 
            NULLIF(c.primer_apellido, ''), 
            NULLIF(c.segundo_apellido, '')
        )
    END AS Candidato,
    COUNT(*) AS 'Cantidad de Votos'
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
LEFT JOIN Ciudadano_ListaPresidencial clp ON lp.lista_id = clp.lista_presidencial_id 
    AND clp.tipo_ciudadano_id = 3 
    AND clp.numero = 1
LEFT JOIN Ciudadano c ON clp.ciudadano_id = c.id
WHERE v.es_observado = FALSE
GROUP BY 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT_WS(' ', 
            NULLIF(c.primer_nombre, ''), 
            NULLIF(c.segundo_nombre, ''), 
            NULLIF(c.primer_apellido, ''), 
            NULLIF(c.segundo_apellido, '')
        )
    END
ORDER BY Partido;`;
    
    try {
        const [rows] = await pool.query(query, [mesa_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
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
};