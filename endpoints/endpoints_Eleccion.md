# Elección Endpoints

## GET /api/eleccion/:id
Obtiene una elección por su ID.
- **Input**: ID de la elección (path parameter)
- **Output**: Datos de la elección
```json
{
    "id": integer,
    "fecha": date,
    "tipo_eleccion_id": integer
}
```

## POST /api/eleccion
Crea una nueva elección.
- **Input**: Datos de la elección
```json
{
    "id": integer,
    "fecha": date,
    "tipo_eleccion_id": integer
}
```

## GET /api/eleccion
Lista todas las elecciones.
- **Output**: Array de elecciones
```json
[
    {
        "id": integer,
        "fecha": date,
        "tipo_eleccion_id": integer
    }
]
```


