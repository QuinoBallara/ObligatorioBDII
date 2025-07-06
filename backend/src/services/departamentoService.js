const pool = require('../db/db').promise();

async function selectDepartamento() {

    const query = 'SELECT * FROM Departamento';

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

async function selectDepartamentoByID(id) {

    const query = 'SELECT * FROM Departamento WHERE id = ?';

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

async function insertDepartamento(nombre) {

    const query = 'INSERT INTO Departamento (nombre) VALUES (?)';

    try {
        const [result] = await pool.query(query, [nombre]);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    selectDepartamentoByID,
    insertDepartamento,
    selectDepartamento
};