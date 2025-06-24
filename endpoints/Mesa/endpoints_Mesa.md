# Mesa Endpoints

## GET /mesa/{id}
Obtiene una mesa por su ID.
- **Input**: ID de la mesa (path parameter)
- **Output**: Datos de la mesa
```json
{
    "id": integer,
    "circuito_id": integer,
    "establecimiento_id": integer,
    "accessible": boolean,
    "vocal_id": integer,
    "presidente_id": integer,
    "secretario_id": integer,
    "policia_id": integer,
    "eleccion_id": integer,
    "esta_abierta": boolean
}
```

## POST /mesa
Crea una nueva mesa.
- **Input**: Datos de la mesa
```json
{
    "id": integer,
    "circuito_id": integer,
    "establecimiento_id": integer,
    "accessible": boolean,
    "vocal_id": integer,
    "presidente_id": integer,
    "secretario_id": integer,
    "policia_id": integer,
    "eleccion_id": integer,
    "esta_abierta": boolean
}
```

## PUT /mesa/{id}
Actualiza una mesa existente.
- **Input**: ID de la mesa (path parameter) y datos a actualizar
```json
{
    "circuito_id": integer,
    "establecimiento_id": integer,
    "accessible": boolean,
    "vocal_id": integer,
    "presidente_id": integer,
    "secretario_id": integer,
    "policia_id": integer,
    "eleccion_id": integer,
    "esta_abierta": boolean
}
```

## DELETE /mesa/{id}
Elimina una mesa por su ID.
- **Input**: ID de la mesa (path parameter)

## GET /mesa
Lista todas las mesas.
- **Output**: Array de mesas
```json
[
    {
        "id": integer,
        "circuito_id": integer,
        "establecimiento_id": integer,
        "accessible": boolean,
        "vocal_id": integer,
        "presidente_id": integer,
        "secretario_id": integer,
        "policia_id": integer,
        "eleccion_id": integer,
        "esta_abierta": boolean
    }
]
```