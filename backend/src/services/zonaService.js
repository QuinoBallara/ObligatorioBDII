const pool = require('../db/db').promise();

async function selectByID(id) {

    const query = 'SELECT * FROM Zona WHERE id = ?';

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

    const query = 'SELECT * FROM Zona';

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

async function insert(nombre, municipio_id) {

    const query = 'INSERT INTO Zona (nombre, municipio_id) VALUES (?, ?)';
    try {
        const [result] = await pool.query(query, [nombre, municipio_id]);
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