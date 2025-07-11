const pool = require('../db/db').promise();

async function selectTipoCiudadanoByID(id) {

    const query = 'SELECT * FROM TipoCiudadano WHERE id = ?';

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch(error) {
        console.error('Error fetching TipoCiudadano by id:', error);
        throw error;
    }
}

async function selectTipoCiudadano() {

    const query = 'SELECT * FROM TipoCiudadano';

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

async function insertTipoCiudadano(nombre) {

    const query = 'INSERT INTO TipoCiudadano (nombre) VALUES (?)';
    try {
        const [result] = await pool.query(query, [nombre]);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }
}

module.exports = {
    selectTipoCiudadanoByID,
    selectTipoCiudadano,
    insertTipoCiudadano
}