-- View por Lista

SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT('Lista ', v.lista_id)
    END AS Lista,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    COUNT(*) AS 'Cantidad de Votos'
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
WHERE v.es_observado = FALSE
GROUP BY 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT('Lista ', v.lista_id)
    END,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END
ORDER BY Lista;


-- View por Partido

SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    COUNT(*) AS 'Cantidad de Votos'
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
WHERE v.es_observado = FALSE
GROUP BY 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END
ORDER BY Partido;

-- View por Cantidato

SELECT 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END AS Partido,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT_WS(' ', 
            NULLIF(c.primer_nombre, ''), 
            NULLIF(c.segundo_nombre, ''), 
            NULLIF(c.primer_apellido, ''), 
            NULLIF(c.segundo_apellido, '')
        )
    END AS Candidato,
    COUNT(*) AS 'Cantidad de Votos'
FROM Voto v
LEFT JOIN ListaPresidencial lp ON v.lista_id = lp.lista_id
LEFT JOIN PartidoPolitico pp ON lp.partido_politico_id = pp.id
LEFT JOIN Ciudadano_ListaPresidencial clp ON lp.lista_id = clp.lista_presidencial_id 
    AND clp.tipo_ciudadano_id = 3 
    AND clp.numero = 1
LEFT JOIN Ciudadano c ON clp.ciudadano_id = c.id
WHERE v.es_observado = FALSE
GROUP BY 
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE COALESCE(pp.nombre, 'Sin Partido')
    END,
    CASE 
        WHEN v.es_valido = FALSE THEN 'Anulado'
        WHEN v.lista_id IS NULL THEN 'En Blanco'
        ELSE CONCAT_WS(' ', 
            NULLIF(c.primer_nombre, ''), 
            NULLIF(c.segundo_nombre, ''), 
            NULLIF(c.primer_apellido, ''), 
            NULLIF(c.segundo_apellido, '')
        )
    END
ORDER BY Partido;