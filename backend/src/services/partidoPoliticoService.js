const pool = require('../db/db').promise();

async function selectByID(id) {

    const query = 'SELECT * FROM PartidoPolitico WHERE id = ?'

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

async function insert(nombre) {
    
    const query = 'INSERT INTO PartidoPolitico (nombre) VALUES (?)'

    try {
        const [result] = await pool.query(query, [nombre]);
        console.log('PartidoPolitico inserted successfully', result);
        return { insertId: result.insertId};
    } catch (error) {
        throw error;
    }
}

async function select(id) {

    const query = 'SELECT * FROM PartidoPolitico'

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

async function insertAutoridad(ciudadano_id, partidoPolitico_id, fecha_inicio, fecha_fin, tipo_ciudadano_id) {

    const query = 'INSERT INTO Autoridad_PartidoPolitico (ciudadano_id, partido_politico_id, fecha_inicio, fecha_fin, tipo_ciudadano_id) VALUES (?, ?, ?, ?, ?)';

    try {
        const[result] = await pool.query(query, [ciudadano_id, partidoPolitico_id, fecha_inicio, fecha_fin, tipo_ciudadano_id]);
        console.log('Autoridad inserted soccessfully:', result);
        return {insertId: result.insertId};
    } catch(error) {
        throw error;
    }
}

async function selectAutoridadesByPartidoPoliticoID(id) {

    const query = 'SELECT * FROM Autoridad_PartidoPolitico WHERE partido_politico_id = ?';

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    selectByID,
    insert,
    select,
    insertAutoridad,
    selectAutoridadesByPartidoPoliticoID
};


