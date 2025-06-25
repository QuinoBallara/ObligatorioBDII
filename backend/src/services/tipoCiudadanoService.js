const pool = require('../db/db').promise();

async function getByID(id) {

    const query = 'SELECT * FROM TipoCiudadano WHERE id = ?';

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch(error) {
        console.error('Error fetching TipoCiudadano by id:', error);
        next(error);
    }
}

async function get() {

    const query = 'SELECT * FROM TipoCiudadano';

    try {
        const [rows] = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch(error) {
        console.error('Error fetching TipoCiudadano:', error);
        next(error);
    }
}

async function insert(nombre) {

    const query = 'INSERT INTO TipoCiudadano (nombre) VALUES (?)';
    try {
        const [result] = await pool.query(query, [nombre]);
        console.log('TipoCiudadano inserted successfully:', result);
        return { insertId: result.insertId };
    } catch(error) {
        console.error('Error inserting TipoCiudadano:', error);
        next(error);
    }
}

module.exports = {
    getByID,
    get,
    insert
}