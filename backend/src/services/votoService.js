const pool = require('../db/db').promise();

async function insertVoto(mesa_id, lista_id, es_observado, es_valido) {
    const query = `
        INSERT INTO Voto (mesa_id, lista_id, es_observado, es_valido) VALUES (?, ?, ?, ?)`;
    
    try {
        const [result] = await pool.query(query, [mesa_id, lista_id, es_observado, es_valido]);
        console.log('Voto inserted successfully:', result);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertVoto,
}