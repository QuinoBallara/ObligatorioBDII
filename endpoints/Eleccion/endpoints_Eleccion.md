# Elección Endpoints

## GET /eleccion/{id}
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

## POST /eleccion
Crea una nueva elección.
- **Input**: Datos de la elección
```json
{
    "id": integer,
    "fecha": date,
    "tipo_eleccion_id": integer
}
```

## PUT /eleccion/{id}
Actualiza una elección existente.
- **Input**: ID de la elección (path parameter) y datos a actualizar
```json
{
    "fecha": date,
    "tipo_eleccion_id": integer
}
```

## DELETE /eleccion/{id}
Elimina una elección por su ID.
- **Input**: ID de la elección (path parameter)

## GET /eleccion
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
