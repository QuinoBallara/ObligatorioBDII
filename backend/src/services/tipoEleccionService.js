const pool = require('../db/db').promise();

async function getByID(id) {

    const query = 'SELECT * FROM TipoEleccion WHERE id = ?';

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

async function get() {

    const query = 'SELECT * FROM TipoEleccion';

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

async function insert(nombre) {

    const query = 'INSERT INTO TipoEleccion (nombre) VALUES (?)';
     
    try {
        const [result] = await pool.query(query, [nombre]);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getByID,
    get,
    insert
}