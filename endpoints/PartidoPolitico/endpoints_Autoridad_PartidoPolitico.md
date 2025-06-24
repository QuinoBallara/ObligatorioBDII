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