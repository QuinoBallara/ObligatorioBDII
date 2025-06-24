# OrganismoEstatal Endpoints

## GET /organismoEstatal/:id
Obtiene un organismo estatal por su ID.
- **Input**: ID del organismo (path parameter)
- **Output**: Datos del organismo
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /organismoEstatal
Crea un nuevo organismo estatal.
- **Input**: Datos del organismo
```json
{
    "nombre": string
}
```

## GET /organismoEstatal/:id/ciudadano/:ciudadanoId
Obtiene una relación ciudadano-organismo por sus IDs.
- **Input**: ID del ciudadano y ID del organismo (path parameters)
- **Output**: Datos de la relación
```json
{
    "ciudadano_id": integer,
    "organismo_estatal_id": integer
}
```

## POST /organismoEstatal/:id/ciudadano
Crea una nueva relación entre ciudadano y organismo estatal.
- **Input**: Datos de la relación
```json
{
    "ciudadano_id": integer,
    "organismo_estatal_id": integer
}
```

## GET /organismoEstatal/:id/ciudadano
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
