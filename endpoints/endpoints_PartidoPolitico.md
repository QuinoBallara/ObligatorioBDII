# Partido Político Endpoints

## GET /api/partido-politico/:id
Obtiene un partido político por su ID.
- **Input**: ID del partido político (path parameter)
- **Output**: Datos del partido político
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /api/partido-politico
Crea un nuevo partido político.
- **Input**: Datos del partido político
```json
{
    "nombre": string
}
```

## GET /api/partido-politico
Lista todos los partidos políticos.
- **Output**: Array de partidos políticos
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```

## POST /api/partido-politico/:id/autoridad
Crea una nueva autoridad de partido político.
- **Input**: Datos de la autoridad
```json
{
    "ciudadano_id": integer,
    "fecha_inicio": date,
    "fecha_fin": date,
    "tipo_ciudadano_id": integer
}
```

## GET /api/partido-politico/:id/autoridad
Obtiene las autoridades de un partido político por su id.
- **Input**: ID de la autoridad en el partido politico (path parameter)
- **Output**: Array con los datos de las autoridades del partido político
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