const e = require('express');
const pool = require('../db/db').promise();

async function getCiudadano(userId = null, credential = null) {
    // Validate that at least one parameter is provided
    if (!userId && !credential) {
        throw new Error('At least one parameter (userId or credential) must be provided');
    }

    let query = `
        SELECT 
            c.id AS ciudadano_id,
            ccc.credencial_civica
        FROM Ciudadano c
        INNER JOIN Ciudadano_CredencialCivica ccc ON c.id = ccc.ciudadano_id
        WHERE 1=1
    `;

    const params = [];

    // Add conditions based on provided parameters
    if (userId && credential) {
        // Both provided - validate they match the same user
        query += ` AND c.id = ? AND ccc.credencial_civica = ?`;
        params.push(userId, credential);
    } else if (userId) {
        // Only userId provided
        query += ` AND c.id = ?`;
        params.push(userId);
    } else if (credential) {
        // Only credential provided
        query += ` AND ccc.credencial_civica = ?`;
        params.push(credential);
    }

    try {
        const [rows] = await pool.query(query, params);
        if (rows.length > 0) {
            return {
                id: String(rows[0].ciudadano_id),
                credencialCivica: rows[0].credencial_civica
            };
        }
        return null;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

async function getPresidenteMesa(userId, userCredential) {
    try {
        const query = `
        SELECT 
            c.id AS ciudadano_id,
            m.id AS mesa_id
        FROM Ciudadano c
        INNER JOIN Ciudadano_CredencialCivica ccc ON c.id = ccc.ciudadano_id
        INNER JOIN Mesa m ON c.id = m.presidente_id
        WHERE c.id = ? 
        AND ccc.credencial_civica = ?;
    `;
        const [rows] = await pool.query(query, [userId, userCredential]);
        if (rows.length > 0) {
            return {
                ciudadano_id: rows[0].ciudadano_id,
                mesa_id: rows[0].mesa_id
            };
        }
        return { ciudadano_id: null, mesa_id: null };
    }
    catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// store tokens in an array for simplicity
let tokenBlacklist = [];

async function blacklistToken(token) {
    // This function would typically add the token to a blacklist in the database
    // For now, we will just store it in an array
    if (!tokenBlacklist.includes(token)) {
        tokenBlacklist.push(token);
    }
    return true;
}

async function checkTokenInBlacklist(token) {
    // This function would typically check if the token is in the blacklist in the database
    // For now, we will just check the array
    return tokenBlacklist.includes(token);
}

module.exports = { getCiudadano, blacklistToken, checkTokenInBlacklist, getPresidenteMesa };