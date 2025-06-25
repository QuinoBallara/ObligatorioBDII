# Zona Endpoints

## GET /api/zona/{id}
Obtiene una zona por su ID.
- **Input**: ID de la zona (path parameter)
- **Output**: Datos de la zona
```json
{
    "id": integer,
    "nombre": string,
    "municipio_id": integer
}
```

## POST /api/zona
Crea una nueva zona.
- **Input**: Datos de la zona
```json
{
    "nombre": string,
    "municipio_id": integer
}
```
