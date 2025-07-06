const pool = require('../db/db').promise();

async function selectByID(id) {

    const query = 'SELECT * FROM Establecimiento WHERE id = ?';

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

async function select() {

    const query = 'SELECT * FROM Establecimiento';

    try{
        const [rows] = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch(error) {
        throw error;
    }
}

async function insert(nombre, direccion, tipo_establecimiento_id, zona_id) {

    const query = 'INSERT INTO Establecimiento (nombre, direccion, tipo_establecimiento_id, zona_id) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [nombre, direccion, tipo_establecimiento_id, zona_id]);
        return { insertId: result.insertId }; 
    } catch(error) {
        throw error;
    }

}


module.exports = {
    selectByID,
    select,
    insert
};