# Ciudadano_Mesa Endpoints

## GET /ciudadano-mesa/{ciudadanoId}/{mesaId}
Obtiene una asignación de ciudadano a mesa por IDs.
- **Input**: ID del ciudadano y ID de la mesa (path parameters)
- **Output**: Datos de la asignación
```json
{
    "ciudadano_id": integer,
    "mesa_id": integer,
    "emitio_voto": boolean
}
```

## POST /ciudadano-mesa
Crea una nueva asignación de ciudadano a mesa.
- **Input**: Datos de la asignación
```json
{
    "ciudadano_id": integer,
    "mesa_id": integer,
    "emitio_voto": boolean
}
```

## PUT /ciudadano-mesa/{ciudadanoId}/{mesaId}
Actualiza una asignación existente.
- **Input**: ID del ciudadano y ID de la mesa (path parameters) y datos a actualizar
```json
{
    "emitio_voto": boolean
}
```

## DELETE /ciudadano-mesa/{ciudadanoId}/{mesaId}
Elimina una asignación de ciudadano a mesa.
- **Input**: ID del ciudadano y ID de la mesa (path parameters)

## GET /ciudadano-mesa
Lista todas las asignaciones de ciudadanos a mesas.
- **Output**: Array de asignaciones
```json
[
    {
        "ciudadano_id": integer,
        "mesa_id": integer,
        "emitio_voto": boolean
    }
]
```

## GET /ciudadano-mesa/mesa/{mesaId}
Lista todos los ciudadanos asignados a una mesa.
- **Input**: ID de la mesa (path parameter)
- **Output**: Array de asignaciones para la mesa
```json
[
    {
        "ciudadano_id": integer,
        "mesa_id": integer,
        "emitio_voto": boolean
    }
]
```