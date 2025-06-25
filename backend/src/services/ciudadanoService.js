const pool = require('../db/db').promise();

async function getByID(id) {

    const query = 'SELECT * FROM Ciudadano WHERE id = ?';

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

    const query = 'SELECT * FROM Ciudadano';

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

async function insert(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo) {

    const query = 'INSERT INTO Ciudadano (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo]);
        console.log('TipoCiudadano inserted successfully:', result);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }

}

async function insertCredencial(credencial_civica, id) {

    const query = 'INSERT INTO Ciudadano_CredencialCivica (ciudadano_id, credencial_civica) VALUES (?, ?)';

    try {
        const [result] = await pool.query(query, [id, credencial_civica]);
        console.log('Credencial inserted successfully:', result);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }

}

module.exports = {
    getByID,
    get,
    insert,
    insertCredencial
};