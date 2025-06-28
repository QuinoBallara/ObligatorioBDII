const pool = require('../db/db').promise();

async function getByID(id) {

    const query = 'SELECT * FROM Eleccion WHERE id = ?';

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch(error) {
        throw error;
    }

}

async function get() {

    const query = 'SELECT * FROM Eleccion';

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

async function insert(fecha, tipo) {

    const query = 'INSERT INTO Eleccion (fecha, tipo_eleccion_id) VALUES (?, ?)';

    try {
        const [result] = await pool.query(query, [fecha, tipo]);
        console.log('Eleccion inserted successfully:', result);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getByID,
    get,
    insert
}