const pool = require('../db/db').promise();

async function selectListaPresidencialByID(listaPresidencialId) {

    const query = `SELECT 
    -- Datos de Lista Presidencial
    lp.lista_id,
    lp.numero AS numero_lista,
    lp.departamento_id,
    lp.partido_politico_id,
    d.nombre AS departamento_nombre,
    pp.nombre AS partido_politico,
    
    -- Datos del Ciudadano en la Lista
    clp.numero AS numero_en_lista,
    
    -- Datos del Ciudadano
    c.id AS ciudadano_id,
    c.primer_nombre,
    c.segundo_nombre,
    c.primer_apellido,
    c.segundo_apellido,
    c.fecha_nacimiento,
    c.esta_vivo,
    
    -- Tipo de Ciudadano
    tc.id AS tipo_ciudadano_id,
    tc.nombre AS tipo_ciudadano,
    
    -- Datos de la Elección
    e.fecha AS fecha_eleccion,
    te.nombre AS tipo_eleccion

FROM ListaPresidencial lp
    -- Join con Ciudadano_ListaPresidencial
    INNER JOIN Ciudadano_ListaPresidencial clp 
        ON lp.lista_id = clp.lista_presidencial_id
    
    -- Join con Ciudadano
    INNER JOIN Ciudadano c 
        ON clp.ciudadano_id = c.id
    
    -- Join con TipoCiudadano
    INNER JOIN TipoCiudadano tc 
        ON clp.tipo_ciudadano_id = tc.id
    
    -- Join con PartidoPolitico
    INNER JOIN PartidoPolitico pp 
        ON lp.partido_politico_id = pp.id
    
    -- Join con Departamento
    INNER JOIN Departamento d 
        ON lp.departamento_id = d.id
    
    -- Join con Lista para obtener datos de elección
    INNER JOIN Lista l 
        ON lp.lista_id = l.id
    
    -- Join con Eleccion
    INNER JOIN Eleccion e 
        ON l.eleccion_id = e.id
    
    -- Join con TipoEleccion
    INNER JOIN TipoEleccion te 
        ON e.tipo_eleccion_id = te.id

WHERE lp.lista_id = ?

ORDER BY 
    lp.lista_id, 
    clp.numero;`;

    try {
        const [rows] = await pool.query(query, [listaPresidencialId]);
        
        if (rows.length === 0) {
            return null;
        }

        // Estructurar los datos en el formato deseado
        const firstRow = rows[0];
        
        const listaPresidencial = {
            lista_id: firstRow.lista_id,
            partido_politico_id: firstRow.partido_politico_id,
            departamento_nombre: firstRow.departamento_nombre,
            partido_nombre: firstRow.partido_politico,
            departamento_id: firstRow.departamento_id,
            numero: firstRow.numero_lista,
            ciudadanos: []
        };

        // Agregar cada ciudadano al array
        rows.forEach(row => {
            listaPresidencial.ciudadanos.push({
                lista_presidencial_id: row.lista_id,
                ciudadano_id: row.ciudadano_id,
                tipo_ciudadano_id: row.tipo_ciudadano_id,
                numero: row.numero_en_lista,
                tipo_ciudadano: row.tipo_ciudadano,
                ciudadano: {
                    id: row.ciudadano_id,
                    primer_nombre: row.primer_nombre,
                    segundo_nombre: row.segundo_nombre,
                    primer_apellido: row.primer_apellido,
                    segundo_apellido: row.segundo_apellido,
                    fecha_nacimiento: row.fecha_nacimiento,
                    esta_vivo: row.esta_vivo
                }
            });
        });

        return listaPresidencial;
    } catch(error) {
        console.error('Error fetching ListaPresidencial by id:', error);
        throw error;
    }
}

async function selectListaPresidencial() {

    const query = `SELECT 
    -- Datos de Lista Presidencial
    lp.lista_id,
    lp.numero AS numero_lista,
    lp.departamento_id,
    lp.partido_politico_id,
    d.nombre AS departamento_nombre,
    pp.nombre AS partido_politico,
    
    -- Datos del Ciudadano en la Lista
    clp.numero AS numero_en_lista,
    
    -- Datos del Ciudadano
    c.id AS ciudadano_id,
    c.primer_nombre,
    c.segundo_nombre,
    c.primer_apellido,
    c.segundo_apellido,
    c.fecha_nacimiento,
    c.esta_vivo,
    
    -- Tipo de Ciudadano
    tc.id AS tipo_ciudadano_id,
    tc.nombre AS tipo_ciudadano,
    
    -- Datos de la Elección
    e.fecha AS fecha_eleccion,
    te.nombre AS tipo_eleccion

FROM ListaPresidencial lp
    -- Join con Ciudadano_ListaPresidencial
    INNER JOIN Ciudadano_ListaPresidencial clp 
        ON lp.lista_id = clp.lista_presidencial_id
    
    -- Join con Ciudadano
    INNER JOIN Ciudadano c 
        ON clp.ciudadano_id = c.id
    
    -- Join con TipoCiudadano
    INNER JOIN TipoCiudadano tc 
        ON clp.tipo_ciudadano_id = tc.id
    
    -- Join con PartidoPolitico
    INNER JOIN PartidoPolitico pp 
        ON lp.partido_politico_id = pp.id
    
    -- Join con Departamento
    INNER JOIN Departamento d 
        ON lp.departamento_id = d.id
    
    -- Join con Lista para obtener datos de elección
    INNER JOIN Lista l 
        ON lp.lista_id = l.id
    
    -- Join con Eleccion
    INNER JOIN Eleccion e 
        ON l.eleccion_id = e.id
    
    -- Join con TipoEleccion
    INNER JOIN TipoEleccion te 
        ON e.tipo_eleccion_id = te.id

ORDER BY 
    lp.lista_id, 
    clp.numero;`;

    try {
        const [rows] = await pool.query(query);
        
        if (rows.length === 0) {
            return null;
        }

        // Agrupar las filas por lista_id
        const listasMap = new Map();
        
        rows.forEach(row => {
            if (!listasMap.has(row.lista_id)) {
                listasMap.set(row.lista_id, {
                    lista_id: row.lista_id,
                    partido_politico_id: row.partido_politico_id,
                    departamento_nombre: row.departamento_nombre,
                    partido_nombre: row.partido_politico,
                    departamento_id: row.departamento_id,
                    numero: row.numero_lista,
                    ciudadanos: []
                });
            }
            
            listasMap.get(row.lista_id).ciudadanos.push({
                lista_presidencial_id: row.lista_id,
                ciudadano_id: row.ciudadano_id,
                tipo_ciudadano_id: row.tipo_ciudadano_id,
                numero: row.numero_en_lista,
                tipo_ciudadano: row.tipo_ciudadano,
                ciudadano: {
                    id: row.ciudadano_id,
                    primer_nombre: row.primer_nombre,
                    segundo_nombre: row.segundo_nombre,
                    primer_apellido: row.primer_apellido,
                    segundo_apellido: row.segundo_apellido,
                    fecha_nacimiento: row.fecha_nacimiento,
                    esta_vivo: row.esta_vivo
                }
            });
        });

        return Array.from(listasMap.values());
    } catch(error) {
        console.error('Error fetching all ListaPresidencial:', error);
        throw error;
    }
}

async function insertListaPresidencial(lista_id, partido_politico_id, departamento_id, numero) {

    const query = 'INSERT INTO ListaPresidencial (lista_id, partido_politico_id, departamento_id, numero) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [lista_id, partido_politico_id, departamento_id, numero]);
        return { insertId: result.insertId };
    } catch(error) {
        throw error;
    }
}

async function selectListaPresidencialByEleccion(eleccion_id) {

    const query = `SELECT 
    -- Datos de Lista Presidencial
    lp.lista_id,
    lp.numero AS numero_lista,
    lp.departamento_id,
    lp.partido_politico_id,
    d.nombre AS departamento_nombre,
    pp.nombre AS partido_politico,
    
    -- Datos del Ciudadano en la Lista
    clp.numero AS numero_en_lista,
    
    -- Datos del Ciudadano
    c.id AS ciudadano_id,
    c.primer_nombre,
    c.segundo_nombre,
    c.primer_apellido,
    c.segundo_apellido,
    c.fecha_nacimiento,
    c.esta_vivo,
    
    -- Tipo de Ciudadano
    tc.id AS tipo_ciudadano_id,
    tc.nombre AS tipo_ciudadano,
    
    -- Datos de la Elección
    e.fecha AS fecha_eleccion,
    te.nombre AS tipo_eleccion

FROM ListaPresidencial lp
    -- Join con Ciudadano_ListaPresidencial
    INNER JOIN Ciudadano_ListaPresidencial clp 
        ON lp.lista_id = clp.lista_presidencial_id
    
    -- Join con Ciudadano
    INNER JOIN Ciudadano c 
        ON clp.ciudadano_id = c.id
    
    -- Join con TipoCiudadano
    INNER JOIN TipoCiudadano tc 
        ON clp.tipo_ciudadano_id = tc.id
    
    -- Join con PartidoPolitico
    INNER JOIN PartidoPolitico pp 
        ON lp.partido_politico_id = pp.id
    
    -- Join con Departamento
    INNER JOIN Departamento d 
        ON lp.departamento_id = d.id
    
    -- Join con Lista para obtener datos de elección
    INNER JOIN Lista l 
        ON lp.lista_id = l.id
    
    -- Join con Eleccion
    INNER JOIN Eleccion e 
        ON l.eleccion_id = e.id
    
    -- Join con TipoEleccion
    INNER JOIN TipoEleccion te 
        ON e.tipo_eleccion_id = te.id

WHERE l.eleccion_id = ?

ORDER BY 
    lp.lista_id, 
    clp.numero;`;

    try {
        const [rows] = await pool.query(query, [eleccion_id]);
        
        if (rows.length === 0) {
            return null;
        }

        // Agrupar las filas por lista_id
        const listasMap = new Map();
        
        rows.forEach(row => {
            if (!listasMap.has(row.lista_id)) {
                listasMap.set(row.lista_id, {
                    lista_id: row.lista_id,
                    partido_politico_id: row.partido_politico_id,
                    departamento_id: row.departamento_id,
                    departamento_nombre: row.departamento_nombre,
                    partido_nombre: row.partido_politico,
                    numero: row.numero_lista,
                    ciudadanos: []
                });
            }
            
            listasMap.get(row.lista_id).ciudadanos.push({
                lista_presidencial_id: row.lista_id,
                ciudadano_id: row.ciudadano_id,
                tipo_ciudadano_id: row.tipo_ciudadano_id,
                numero: row.numero_en_lista,
                tipo_ciudadano: row.tipo_ciudadano,
                ciudadano: {
                    id: row.ciudadano_id,
                    primer_nombre: row.primer_nombre,
                    segundo_nombre: row.segundo_nombre,
                    primer_apellido: row.primer_apellido,
                    segundo_apellido: row.segundo_apellido,
                    fecha_nacimiento: row.fecha_nacimiento,
                    esta_vivo: row.esta_vivo
                }
            });
        });

        return Array.from(listasMap.values());
    } catch(error) {
        console.error('Error fetching ListaPresidencial by eleccion_id:', error);
        throw error;
    }
}

async function selectListaPresidencialByEleccionAndPartidoPolitico(eleccion_id, partido_politico_id) {

    const query = `SELECT 
    -- Datos de Lista Presidencial
    lp.lista_id,
    lp.numero AS numero_lista,
    lp.departamento_id,
    lp.partido_politico_id,
    d.nombre AS departamento_nombre,
    pp.nombre AS partido_politico,
    
    -- Datos del Ciudadano en la Lista
    clp.numero AS numero_en_lista,
    
    -- Datos del Ciudadano
    c.id AS ciudadano_id,
    c.primer_nombre,
    c.segundo_nombre,
    c.primer_apellido,
    c.segundo_apellido,
    c.fecha_nacimiento,
    c.esta_vivo,
    
    -- Tipo de Ciudadano
    tc.id AS tipo_ciudadano_id,
    tc.nombre AS tipo_ciudadano,
    
    -- Datos de la Elección
    e.fecha AS fecha_eleccion,
    te.nombre AS tipo_eleccion

FROM ListaPresidencial lp
    -- Join con Ciudadano_ListaPresidencial
    INNER JOIN Ciudadano_ListaPresidencial clp 
        ON lp.lista_id = clp.lista_presidencial_id
    
    -- Join con Ciudadano
    INNER JOIN Ciudadano c 
        ON clp.ciudadano_id = c.id
    
    -- Join con TipoCiudadano
    INNER JOIN TipoCiudadano tc 
        ON clp.tipo_ciudadano_id = tc.id
    
    -- Join con PartidoPolitico
    INNER JOIN PartidoPolitico pp 
        ON lp.partido_politico_id = pp.id
    
    -- Join con Departamento
    INNER JOIN Departamento d 
        ON lp.departamento_id = d.id
    
    -- Join con Lista para obtener datos de elección
    INNER JOIN Lista l 
        ON lp.lista_id = l.id
    
    -- Join con Eleccion
    INNER JOIN Eleccion e 
        ON l.eleccion_id = e.id
    
    -- Join con TipoEleccion
    INNER JOIN TipoEleccion te 
        ON e.tipo_eleccion_id = te.id

WHERE l.eleccion_id = ? AND lp.partido_politico_id = ?

ORDER BY 
    lp.lista_id, 
    clp.numero;`;

    try {
        const [rows] = await pool.query(query, [eleccion_id, partido_politico_id]);
        
        if (rows.length === 0) {
            return null;
        }

        // Agrupar las filas por lista_id
        const listasMap = new Map();
        
        rows.forEach(row => {
            if (!listasMap.has(row.lista_id)) {
                listasMap.set(row.lista_id, {
                    lista_id: row.lista_id,
                    partido_politico_id: row.partido_politico_id,
                    departamento_id: row.departamento_id,
                    departamento_nombre: row.departamento_nombre,
                    partido_nombre: row.partido_politico,
                    numero: row.numero_lista,
                    ciudadanos: []
                });
            }
            
            listasMap.get(row.lista_id).ciudadanos.push({
                lista_presidencial_id: row.lista_id,
                ciudadano_id: row.ciudadano_id,
                tipo_ciudadano_id: row.tipo_ciudadano_id,
                numero: row.numero_en_lista,
                tipo_ciudadano: row.tipo_ciudadano,
                ciudadano: {
                    id: row.ciudadano_id,
                    primer_nombre: row.primer_nombre,
                    segundo_nombre: row.segundo_nombre,
                    primer_apellido: row.primer_apellido,
                    segundo_apellido: row.segundo_apellido,
                    fecha_nacimiento: row.fecha_nacimiento,
                    esta_vivo: row.esta_vivo
                }
            });
        });

        return Array.from(listasMap.values());
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