const pool = require('../db/db').promise();

async function selectListaByID(id) {

    const query = 'SELECT * FROM Lista WHERE id = ?';

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch(error) {
        console.error('Error fetching Lista by id:', error);
        throw error;
    }
}

async function selectLista() {

    const query = 'SELECT * FROM Lista';

    try {
        const [rows] = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch(error) {
        throw error;
    }
}

async function insertLista(eleccion_id) {
    const query = 'INSERT INTO Lista (eleccion_id) VALUES (?)';
    try {
        const [result] = await pool.query(query, [eleccion_id]);
        console.log('Lista inserted successfully:', result);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }
}

module.exports = {
    selectListaByID,
    selectLista,
    insertLista
}