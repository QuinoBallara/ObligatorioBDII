const pool = require('../db/db').promise();

async function selectMesa() {
    const query = 'SELECT * FROM Mesa';

    try {
        const [rows] = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function selectMesaById(id) {

    const query = `
        SELECT 
            m.*,
            d.id as departamento_id,
            mun.nombre as municipio_nombre,
            z.nombre as zona_nombre,
            e.nombre as establecimiento_nombre
        FROM Mesa m
        JOIN Establecimiento e ON m.establecimiento_id = e.id
        JOIN Zona z ON e.zona_id = z.id
        JOIN Municipio mun ON z.municipio_id = mun.id
        JOIN Departamento d ON mun.departamento_id = d.id
        WHERE m.id = ?`;

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
        INSERT INTO Mesa (circuito_id, establecimiento_id, accesible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.query(query, [circuito_id, establecimiento_id, accessible, vocal_id, presidente_id, secretario_id, policia_id, eleccion_id]);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }

}

async function updateAbierta(id, esta_abierta) {
    const query = 'UPDATE Mesa SET esta_abierta = ? WHERE id = ?';
    try {
        const [result] = await pool.query(query, [esta_abierta, id]);
        return { affectedRows: result.affectedRows };
    } catch (error) {
        throw error;
    }
}






async function selectVotosPerListaPerMesa(mesa_id) {

    const query = `SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT('Lista ', v.lista_id)
    END AS Lista,
    COUNT(*) AS CantidadDeVotos
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
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
        ELSE CONCAT('Lista ', v.lista_id)
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
    COUNT(*) AS 'CantidadDeVotos'
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
    COUNT(*) AS 'CantidadDeVotos'
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
    selectVotosPerListaPerMesa,
    selectVotosPerPartidoPerMesa,
    selectVotosPerCandidatoPerMesa,
    selectMesa
};