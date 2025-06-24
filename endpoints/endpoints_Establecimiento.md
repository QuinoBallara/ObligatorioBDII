# Establecimiento Endpoints

## GET /establecimiento/:id
Obtiene un establecimiento por su ID.
- **Input**: ID del establecimiento (path parameter)
- **Output**: Datos del establecimiento
```json
{
    "id": integer,
    "nombre": string,
    "direccion": string,
    "tipo_establecimiento_id": integer,
    "zona_id": integer
}
```
## POST /establecimiento
Crea un nuevo establecimiento.
- **Input**: Datos del establecimiento
```json
{
    "nombre": string,
    "direccion": string,
    "tipo_establecimiento_id": integer,
    "zona_id": integer
}
```
