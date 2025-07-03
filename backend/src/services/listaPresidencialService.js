const pool = require('../db/db').promise();

async function selectListaPresidencialByID(listaPresidencialId) {

    const query = 'SELECT * FROM ListaPresidencial WHERE lista_id = ?';

    try {
        const [rows] = await pool.query(query, [listaPresidencialId]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch(error) {
        console.error('Error fetching ListaPresidencial by id:', error);
        throw error;
    }
}

async function selectListaPresidencial() {

    const query = 'SELECT * FROM ListaPresidencial';

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

async function insertListaPresidencial(lista_id, partido_politico_id, departamento_id, numero) {

    const query = 'INSERT INTO ListaPresidencial (lista_id, partido_politico_id, departamento_id, numero) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [lista_id, partido_politico_id, departamento_id, numero]);
        console.log('ListaPresidencial inserted successfully:', result);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }
}

async function selectListaPresidencialByEleccion(eleccion_id) {

    const query = 'SELECT lp.*, d.nombre as departamento_nombre, pp.nombre as partido_nombre FROM ListaPresidencial lp JOIN Lista l ON l.id = lp.lista_id JOIN Departamento d ON lp.departamento_id = d.id JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id WHERE l.eleccion_id = ?';

    try {
        const [rows] = await pool.query(query, [eleccion_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch(error) {
        console.error('Error fetching ListaPresidencial by eleccion_id:', error);
        throw error;
    }
}

async function selectListaPresidencialByEleccionAndPartidoPolitico(eleccion_id, partido_politico_id) {

    const query = 'SELECT lp.* FROM ListaPresidencial lp JOIN Lista l ON l.id = lp.lista_id WHERE l.eleccion_id = ? AND lp.partido_politico_id = ?';

    try {
        const [rows] = await pool.query(query, [eleccion_id, partido_politico_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch(error) {
        console.error('Error fetching ListaPresidencial by eleccion_id and partido_politico_id:', error);
        throw error;
    }
}

module.exports = {
    selectListaPresidencialByID,
    selectListaPresidencial,
    insertListaPresidencial,
    selectListaPresidencialByEleccion,
    selectListaPresidencialByEleccionAndPartidoPolitico
}