const pool = require('../db/db').promise();


async function getDepartamentoByID(id) {

    const query = 'SELECT * FROM Departamento WHERE id = ?';

    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching departamento by ID:', error);
        next(error);
    }

}

async function insertDepartamento(nombre) {

    const query = 'INSERT INTO Departamento (nombre) VALUES (?)';

    try {
        const [result] = await pool.query(query, [nombre]);
        console.log('Departamento inserted successfully:', result);
        return { insertId: result.insertId };
    } catch (error) {
        console.error('Error inserting departamento:', error);
        next(error);
    }
}

module.exports = {
    getDepartamentoByID,
    insertDepartamento
};