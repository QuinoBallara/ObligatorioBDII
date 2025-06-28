const pool = require('../db/db').promise();

async function selectByID(id) {

    const query = 'SELECT * FROM Municipio WHERE id = ?';

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

    const query = 'SELECT * FROM Municipio';

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

async function insert(nombre, departamento_id) {

    const query = 'INSERT INTO Municipio (nombre, departamento_id) VALUES (?, ?)';
    try {
        const [result] = await pool.query(query, [nombre, departamento_id]);
        console.log('Municipio inserted successfully:', result);
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