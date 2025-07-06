const pool = require('../db/db').promise();

async function selectCiudadanoListaPresidencialByListaPresidencialId(lista_presidencial_id) {
    const query = 'SELECT * FROM Ciudadano_ListaPresidencial WHERE lista_presidencial_id = ?';
    
    try {
        const [rows] = await pool.query(query, [lista_presidencial_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch(error) {
        console.error('Error fetching CiudadanoListaPresidencial by lista_presidencial_id:', error);
        throw error;
    }
}

async function selectCiudadanoListaPresidencial() {
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

async function insertCiudadanoListaPresidencial(lista_presidencial_id, ciudadano_id, tipo_ciudadano_id, numero) {
    
    const query = 'INSERT INTO Ciudadano_ListaPresidencial (lista_presidencial_id, ciudadano_id, tipo_ciudadano_id, numero) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [lista_presidencial_id, ciudadano_id, tipo_ciudadano_id, numero]);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }
}

module.exports = {
    insertCiudadanoListaPresidencial,
    selectCiudadanoListaPresidencialByListaPresidencialId,
    selectCiudadanoListaPresidencial
}