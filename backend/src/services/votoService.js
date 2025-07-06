const pool = require('../db/db').promise();

async function insertVoto(mesa_id, lista_id, es_observado, es_valido) {
    const query = `
        INSERT INTO Voto (mesa_id, lista_id, es_observado, es_valido) VALUES (?, ?, ?, ?)`;
    
    try {
        const [result] = await pool.query(query, [mesa_id, lista_id, es_observado, es_valido]);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

async function selectVotoByID(id) {
    const query = 'SELECT * FROM Voto WHERE id = ?';
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

async function selectVoto() {
    const query = 'SELECT * FROM Voto';
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

module.exports = {
    insertVoto,
    selectVotoByID,
    selectVoto
}