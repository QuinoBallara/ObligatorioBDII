# Autoridad_PartidoPolitico Endpoints

## GET /autoridad_partido/{id}
Obtiene una autoridad de partido político por sus IDs.
- **Input**: ID de la autoridad en el partido politico (path parameter)
- **Output**: Datos de la autoridad del partido político
```json
{
    "id" : integer,
    "ciudadano_id": integer,
    "partido_politico_id": integer,
    "fecha_inicio": date,
    "fecha_fin": date,
    "tipo_ciudadano_id": integer
}
```

## POST /autoridad_partido
Crea una nueva autoridad de partido político.
- **Input**: Datos de la autoridad
```json
{
    "ciudadano_id": integer,
    "partido_politico_id": integer,
    "fecha_inicio": date,
    "fecha_fin": date,
    "tipo_ciudadano_id": integer
}
```

## PUT /autoridad_partido/{id}
Actualiza una autoridad de partido político existente.
- **Input**: ID de la autoridad en el partido politico (path parameter)
```json
{
    "fecha_inicio": date,
    "fecha_fin": date
}
```

## DELETE /autoridad_partido/{id}
Elimina una autoridad de partido político por sus IDs.
- **Input**: ID de la autoridad en el partido politico (path parameter)

## GET /autoridad_partido
Lista todas las autoridades de partidos políticos.
- **Output**: Array de autoridades
```json
[
    {
        "ciudadano_id": integer,
        "partido_politico_id": integer,
        "fecha_inicio": date,
        "fecha_fin": date,
        "tipo_ciudadano_id": integer
    }
]
```

## GET /autoridad_partido/ciudadano/{ciudadano_id}
Obtiene todos los partidos políticos en los que un ciudadano ha sido autoridad.
- **Input**: ID del ciudadano (path parameter)
- **Output**: Array de partidos políticos con fechas de autoridad
```json
[
    {
        "id": integer,
        "partido_politico_id": integer,
        "nombre_partido": string,
        "fecha_inicio": date,
        "fecha_fin": date,
        "tipo_ciudadano_id": integer,
        "tipo_ciudadano_nombre": string
    }
]
```

## GET /autoridad_partido/partido/{partido_id}
Obtiene todas las autoridades de un partido político específico.
- **Input**: ID del partido político (path parameter)
- **Output**: Array de autoridades del partido
```json
[
    {
        "id": integer,
        "ciudadano_id": integer,
        "nombre_ciudadano": string,
        "fecha_inicio": date,
        "fecha_fin": date,
        "tipo_ciudadano_id": integer,
        "tipo_ciudadano_nombre": string
    }
]
```