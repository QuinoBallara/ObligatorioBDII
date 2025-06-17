# Lista Endpoints

## GET /lista/{id}
Obtiene una lista por su ID.
- **Input**: ID de la lista (path parameter)
- **Output**: Datos de la lista
```json
{
    "id": integer,
    "eleccion_id": integer
}
```

## POST /lista
Crea una nueva lista.
- **Input**: Datos de la lista
```json
{
    "id": integer,
    "eleccion_id": integer
}
```

## PUT /lista/{id}
Actualiza una lista existente.
- **Input**: ID de la lista (path parameter) y datos a actualizar
```json
{
    "eleccion_id": integer
}
```

## DELETE /lista/{id}
Elimina una lista por su ID.
- **Input**: ID de la lista (path parameter)

## GET /lista
Lista todas las listas.
- **Output**: Array de listas
```json
[
    {
        "id": integer,
        "eleccion_id": integer
    }
]
```

## GET /lista/eleccion/{eleccion_id}
Obtiene todas las listas para una elección específica.
- **Input**: ID de la elección (path parameter)
- **Output**: Array de listas que pertenecen a la elección
```json
[
    {
        "id": integer,
        "eleccion_id": integer
    }
]
```
