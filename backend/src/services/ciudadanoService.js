const pool = require('../db/db').promise();

async function selectCiudadanoByID(id) {

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

async function selectCiudadano() {

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

async function insertCiudadano(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo) {

    const query = 'INSERT INTO Ciudadano (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, esta_vivo]);
        return { insertId: id }; // Return the provided ID since it's not auto-generated
    } catch(error) {
        throw error;
    }

}

async function insertCredencialCiudadano(credencial_civica, id) {

    const query = 'INSERT INTO Ciudadano_CredencialCivica (ciudadano_id, credencial_civica) VALUES (?, ?)';

    try {
        const [result] = await pool.query(query, [id, credencial_civica]);
        return { insertId: credencial_civica }; // Return the ciudadano_id since it's the identifier for this relationship
    } catch(error) {
        throw error;
    }

}

module.exports = {
    selectCiudadanoByID,
    selectCiudadano,
    insertCiudadano,
    insertCredencialCiudadano
};