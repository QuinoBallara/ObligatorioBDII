# Ciudadano_OrganismoEstatal Endpoints

## GET /ciudadano_organismo/{ciudadanoId}/{organismoId}
Obtiene una relación ciudadano-organismo por sus IDs.
- **Input**: ID del ciudadano y ID del organismo (path parameters)
- **Output**: Datos de la relación
```json
{
    "ciudadano_id": integer,
    "organismo_estatal_id": integer
}
```

## POST /ciudadano_organismo
Crea una nueva relación entre ciudadano y organismo estatal.
- **Input**: Datos de la relación
```json
{
    "ciudadano_id": integer,
    "organismo_estatal_id": integer
}
```

## DELETE /ciudadano_organismo/{ciudadanoId}/{organismoId}
Elimina una relación ciudadano-organismo por sus IDs.
- **Input**: ID del ciudadano y ID del organismo (path parameters)

## GET /ciudadano_organismo
Lista todas las relaciones ciudadano-organismo.
- **Output**: Array de relaciones
```json
[
    {
        "ciudadano_id": integer,
        "organismo_estatal_id": integer
    }
]
```

## GET /ciudadano_organismo/ciudadano/{ciudadanoId}
Lista todos los organismos asociados a un ciudadano.
- **Input**: ID del ciudadano (path parameter)
- **Output**: Array de relaciones
```json
[
    {
        "ciudadano_id": integer,
        "organismo_estatal_id": integer
    }
]
```

## GET /ciudadano_organismo/organismo/{organismoId}
Lista todos los ciudadanos asociados a un organismo.
- **Input**: ID del organismo (path parameter)
- **Output**: Array de relaciones
```json
[
    {
        "ciudadano_id": integer,
        "organismo_estatal_id": integer
    }
]
```
