# Voto Endpoints

## GET /voto/{id}
Obtiene un voto por su ID.
- **Input**: ID del voto (path parameter)
- **Output**: Datos del voto
```json
{
    "id": integer,
    "mesa_id": integer,
    "lista_id": integer | null,
    "es_observado": boolean,
    "es_valido": boolean,
    "fecha_hora": timestamp
}
```

## POST /voto
Crea un nuevo voto.
- **Input**: Datos del voto
```json
{
    "mesa_id": integer,
    "lista_id": integer | null,
    "es_observado": boolean,
    "es_valido": boolean,
    "fecha_hora": timestamp
}
```

## PUT /voto/{id}
Actualiza un voto existente.
- **Input**: ID del voto (path parameter) y datos a actualizar
```json
{
    "mesa_id": integer,
    "lista_id": integer | null,
    "es_observado": boolean,
    "es_valido": boolean,
    "fecha_hora": timestamp
}
```

## DELETE /voto/{id}
Elimina un voto por su ID.
- **Input**: ID del voto (path parameter)

## GET /voto
Lista todos los votos.
- **Output**: Array de votos
```json
[
    {
        "id": integer,
        "mesa_id": integer,
        "lista_id": integer | null,
        "es_observado": boolean,
        "es_valido": boolean,
        "fecha_hora": timestamp
    }
]
```

## GET /voto/mesa/{mesa_id}
Obtiene todos los votos de una mesa específica.
- **Input**: ID de la mesa (path parameter)
- **Output**: Array de votos para la mesa especificada
```json
[
    {
        "id": integer,
        "mesa_id": integer,
        "lista_id": integer | null,
        "es_observado": boolean,
        "es_valido": boolean,
        "fecha_hora": timestamp
    }
]
```

## GET /voto/lista/{lista_id}
Obtiene todos los votos para una lista específica.
- **Input**: ID de la lista (path parameter)
- **Output**: Array de votos para la lista especificada
```json
[
    {
        "id": integer,
        "mesa_id": integer,
        "lista_id": integer,
        "es_observado": boolean,
        "es_valido": boolean,
        "fecha_hora": timestamp
    }
]
```