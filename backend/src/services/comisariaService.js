const pool = require('../db/db').promise();

async function selectByID(id) {

    const query = 'SELECT * FROM Comisaria WHERE id = ?';

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

async function insert(nombre, municipio_id) {

    const query = 'INSERT INTO Comisaria (municipio_id, nombre) VALUES (?, ?)';
    try {
        const [result] = await pool.query(query, [municipio_id, nombre]);
        console.log('Comisaria inserted successfully:', result);
        return { insertId: result.insertId }; 
    } catch(error) {
        throw error;
    }

}

async function select() {

    const query = 'SELECT * FROM Comisaria';

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

async function insertPolicia(policia_id, comisaria_id) {
    const query = 'INSERT INTO Policia_Comisaria (policia_id, comisaria_id) VALUES(?, ?)';

    try{
        const [result] = await pool.query(query, [policia_id, comisaria_id]);
        console.log('Comisaria inserted successfully:', result);
        return {insertId: result.insertId};
    } catch (error) {
        throw error;
    }
}

async function selectPoliciaComisariaByComisariaIDAndPoliciaID(comisaria_id, policia_id) {
    const query = 'SELECT * FROM Policia_Comisaria WHERE comisaria_id = ? AND policia_id = ?';

    try {
        const [rows] = await pool.query(query, [comisaria_id, policia_id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    selectByID,
    insert,
    select,
    insertPolicia,
    selectPoliciaComisariaByComisariaIDAndPoliciaID
};