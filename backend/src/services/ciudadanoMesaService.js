const pool = require('../db/db').promise();

async function insertCiudadanoMesa(ciudadano_id, mesa_id, emitio_voto = false) {
    const query = `
        INSERT INTO Ciudadano_Mesa (ciudadano_id, mesa_id, emitio_voto) VALUES (?, ?, ?)`;

    try {
        const [result] = await pool.query(query, [ciudadano_id, mesa_id, emitio_voto]);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

async function updateCiudadanoMesaToEmitioVotoTrue(ciudadano_id, mesa_id) {
    const query = `
        UPDATE Ciudadano_Mesa SET emitio_voto = TRUE WHERE ciudadano_id = ? AND mesa_id = ?`;

    try {
        const [result] = await pool.query(query, [ciudadano_id, mesa_id]);
        return { affectedRows: result.affectedRows };
    } catch (error) {
        throw error;
    }
}

async function selectCiudadanoMesaByMesaIDAndCiudadanoID(mesa_id, ciudadano_id) {
    const query = `
        SELECT * FROM Ciudadano_Mesa WHERE mesa_id = ? AND ciudadano_id = ?`;

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

async function selectCiudadanoMesaByMesaId(mesa_id) {
    const query = `
        SELECT 
            cm.*,
            c.primer_nombre,
            c.segundo_nombre,
            c.primer_apellido,
            c.segundo_apellido,
            c.fecha_nacimiento,
            c.esta_vivo
        FROM Ciudadano_Mesa cm
        INNER JOIN Ciudadano c ON cm.ciudadano_id = c.id
        WHERE cm.mesa_id = ?
        ORDER BY c.primer_apellido, c.segundo_apellido, c.primer_nombre`;

    try {
        const [rows] = await pool.query(query, [mesa_id]);
        if (rows.length > 0) {
            return rows;
        }
        return [];
    } catch (error) {
        throw error;
    }
}

async function selectCiudadanoMesaByCiudadanoId(ciudadano_id) {
    const query = `
        SELECT * FROM Ciudadano_Mesa WHERE ciudadano_id = ?`;

    try {
        const [rows] = await pool.query(query, [ciudadano_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertCiudadanoMesa,
    updateCiudadanoMesaToEmitioVotoTrue,
    selectCiudadanoMesaByMesaIDAndCiudadanoID,
    selectCiudadanoMesaByMesaId,
    selectCiudadanoMesaByCiudadanoId
}