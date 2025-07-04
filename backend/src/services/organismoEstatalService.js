const pool = require('../db/db').promise();


async function selectOrganismoEstatalByID(id) {

    const query = 'SELECT * FROM OrganismoEstatal WHERE id = ?';

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

async function selectOrganismoEstatal() {

    const query = 'SELECT * FROM OrganismoEstatal';

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


async function insertOrganismoEstatal(nombre) {

    const query = 'INSERT INTO OrganismoEstatal (nombre) VALUES (?)';

    try {
        const [result] = await pool.query(query, [nombre]);
        console.log('Organismo Estatal inserted successfully:', result);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

async function insertCiudadanoOrganismoEstatal(organismo_estatal_id, ciudadano_id) {

    const query = 'INSERT INTO Ciudadano_OrganismoEstatal (ciudadano_id, organismo_estatal_id) VALUES (?, ?)';

    try {
        const [result] = await pool.query(query, [organismo_estatal_id, ciudadano_id]);
        console.log('Ciudadano Organismo Estatal inserted successfully:', result);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

async function selectCiudadanoOrganismoEstatalByOrganismoEstatalID(organismo_estatal_id) {
    const query = 'SELECT * FROM Ciudadano_OrganismoEstatal WHERE organismo_estatal_id = ?';

    try {
        const [rows] = await pool.query(query, [organismo_estatal_id]);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw error;
    }

}

async function selectCiudadanoOrganismoEstatalByOrganismoEstatalIDAndCiudadanoID(organismo_estatal_id, ciudadano_id) {
    const query = 'SELECT * FROM Ciudadano_OrganismoEstatal WHERE organismo_estatal_id = ? AND ciudadano_id = ?';

    try {
        const [rows] = await pool.query(query, [organismo_estatal_id, ciudadano_id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw error;
    }

}



module.exports = {
    selectOrganismoEstatalByID,
    selectOrganismoEstatal,
    insertOrganismoEstatal,
    insertCiudadanoOrganismoEstatal,
    selectCiudadanoOrganismoEstatalByOrganismoEstatalID,
    selectCiudadanoOrganismoEstatalByOrganismoEstatalIDAndCiudadanoID
};